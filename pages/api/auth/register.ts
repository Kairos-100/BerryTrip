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
    const { firstName, lastName, email, password, location, interests } = req.body

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !location) {
      res.status(400).json({ 
        error: 'Missing required fields',
        details: 'firstName, lastName, email, password, and location are required'
      })
      return
    }

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Invalid email format' })
      return
    }

    // Validate password strength
    if (password.length < 8) {
      res.status(400).json({ error: 'Password must be at least 8 characters long' })
      return
    }

    // Check if user already exists
    const existingUser = db.users.findByEmail(email)
    if (existingUser) {
      res.status(409).json({ error: 'User with this email already exists' })
      return
    }

    // Hash password
    const hashedPassword = await authUtils.hashPassword(password)

    // Create user
    const user = db.users.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      location: location.trim(),
      interests: interests || [],
      verified: true // For now, auto-verify users
    })

    // Generate JWT token
    const authUser = authUtils.toAuthUser(user)
    const token = authUtils.generateToken(authUser)

    // Send welcome email (optional, don't fail registration if email fails)
    try {
      await emailService.sendWelcomeEmail(user.email, user.firstName)
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError)
      // Continue with registration even if email fails
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: authUser,
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong during registration'
    })
  }
}
