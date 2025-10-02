import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const JWT_EXPIRES_IN = '7d'

export interface AuthUser {
  id: string
  firstName: string
  lastName: string
  email: string
  location: string
  interests: string[]
  verified: boolean
}

export const authUtils = {
  // Hash password
  hashPassword: async (password: string): Promise<string> => {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
  },
  
  // Verify password
  verifyPassword: async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword)
  },
  
  // Generate JWT token
  generateToken: (user: AuthUser): string => {
    return jwt.sign(
      { 
        userId: user.id,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )
  },
  
  // Verify JWT token
  verifyToken: (token: string): { userId: string; email: string } | null => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      return {
        userId: decoded.userId,
        email: decoded.email
      }
    } catch (error) {
      return null
    }
  },
  
  // Generate password reset token
  generatePasswordResetToken: (): string => {
    return crypto.randomBytes(32).toString('hex')
  },
  
  // Convert user to auth user (remove sensitive data)
  toAuthUser: (user: any): AuthUser => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      interests: user.interests,
      verified: user.verified
    }
  }
}
