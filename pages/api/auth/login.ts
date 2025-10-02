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
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({ 
        error: 'Missing required fields',
        details: 'email and password are required'
      })
      return
    }

    // Find user by email
    const user = db.users.findByEmail(email)
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    // Verify password
    const isPasswordValid = await authUtils.verifyPassword(password, user.password)
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password' })
      return
    }

    // Generate JWT token
    const authUser = authUtils.toAuthUser(user)
    const token = authUtils.generateToken(authUser)

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: authUser,
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong during login'
    })
  }
}
