import { NextApiRequest, NextApiResponse } from 'next'
import { authUtils } from '../../../lib/auth'
import { db } from '../../../lib/database-config'

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
    const { token } = req.body

    if (!token) {
      res.status(400).json({ error: 'Token is required' })
      return
    }

    // Verify JWT token
    const decoded = authUtils.verifyToken(token)
    if (!decoded) {
      res.status(401).json({ error: 'Invalid or expired token' })
      return
    }

    // Find user
    const user = db.users.findById(decoded.userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    // Return user data
    const authUser = authUtils.toAuthUser(user)
    res.status(200).json({
      success: true,
      user: authUser
    })

  } catch (error) {
    console.error('Token verification error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong during token verification'
    })
  }
}
