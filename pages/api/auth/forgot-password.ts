import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/database'
import { authUtils } from '../../../lib/auth'
import { emailService } from '../../../lib/email'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configure CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { email } = req.body

    // Validate email
    if (!email) {
      res.status(400).json({ error: 'Email is required' })
      return
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' })
      return
    }

    // Check if user exists
    const user = db.users.findByEmail(email)
    if (!user) {
      // For security, don't reveal if email exists or not
      res.status(200).json({
        success: true,
        message: 'If an account with that email exists, we have sent a password reset link.'
      })
      return
    }

    // Generate reset token
    const resetToken = authUtils.generatePasswordResetToken()
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour from now

    // Store reset token
    db.passwordResetTokens.create({
      email: user.email,
      token: resetToken,
      expiresAt: expiresAt.toISOString(),
      used: false
    })

    // Send reset email
    const emailSent = await emailService.sendPasswordResetEmail(user.email, resetToken)
    
    if (!emailSent) {
      res.status(500).json({ 
        error: 'Failed to send reset email',
        message: 'Please try again later'
      })
      return
    }

    res.status(200).json({
      success: true,
      message: 'Password reset link has been sent to your email'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    })
  }
}
