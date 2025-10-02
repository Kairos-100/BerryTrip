import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../lib/database'
import { authUtils } from '../../../lib/auth'

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
    const { token, password } = req.body

    // Validate required fields
    if (!token || !password) {
      res.status(400).json({ 
        error: 'Missing required fields',
        details: 'token and password are required'
      })
      return
    }

    // Validate password strength
    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters long' })
      return
    }

    // Find and validate reset token
    const resetToken = db.passwordResetTokens.findByToken(token)
    if (!resetToken) {
      res.status(400).json({ error: 'Invalid or expired reset token' })
      return
    }

    // Check if token is expired
    const now = new Date()
    const tokenExpiry = new Date(resetToken.expiresAt)
    if (now > tokenExpiry) {
      res.status(400).json({ error: 'Reset token has expired' })
      return
    }

    // Find user
    const user = db.users.findByEmail(resetToken.email)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Hash new password
    const hashedPassword = await authUtils.hashPassword(password)

    // Update user password
    const updatedUser = db.users.update(user.id, { password: hashedPassword })
    if (!updatedUser) {
      res.status(500).json({ error: 'Failed to update password' })
      return
    }

    // Mark token as used
    db.passwordResetTokens.markAsUsed(token)

    // Generate new JWT token
    const authUser = authUtils.toAuthUser(updatedUser)
    const newToken = authUtils.generateToken(authUser)

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully',
      user: authUser,
      token: newToken
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong. Please try again later.'
    })
  }
}
