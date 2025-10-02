import connectDB from './mongodb'
import User, { IUser } from './models/User'
import PasswordResetToken, { IPasswordResetToken } from './models/PasswordResetToken'
import Message, { IMessage } from './models/Message'

export interface UserData {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  interests: string[]
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface PasswordResetTokenData {
  id: string
  email: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

export const db = {
  // User operations
  users: {
    create: async (userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserData> => {
      await connectDB()
      
      const user = new User(userData)
      const savedUser = await user.save()
      
      return {
        id: savedUser._id.toString(),
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        password: savedUser.password,
        location: savedUser.location,
        interests: savedUser.interests,
        verified: savedUser.verified,
        createdAt: savedUser.createdAt.toISOString(),
        updatedAt: savedUser.updatedAt.toISOString()
      }
    },
    
    findByEmail: async (email: string): Promise<UserData | null> => {
      await connectDB()
      
      const user = await User.findOne({ email: email.toLowerCase() })
      if (!user) return null
      
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        location: user.location,
        interests: user.interests,
        verified: user.verified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    },
    
    findById: async (id: string): Promise<UserData | null> => {
      await connectDB()
      
      const user = await User.findById(id)
      if (!user) return null
      
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        location: user.location,
        interests: user.interests,
        verified: user.verified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    },
    
    update: async (id: string, updates: Partial<UserData>): Promise<UserData | null> => {
      await connectDB()
      
      const user = await User.findByIdAndUpdate(
        id,
        { ...updates, updatedAt: new Date() },
        { new: true, runValidators: true }
      )
      
      if (!user) return null
      
      return {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        location: user.location,
        interests: user.interests,
        verified: user.verified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }
    },
    
    getAll: async (): Promise<UserData[]> => {
      await connectDB()
      
      const users = await User.find().sort({ createdAt: -1 })
      
      return users.map(user => ({
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        location: user.location,
        interests: user.interests,
        verified: user.verified,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString()
      }))
    }
  },
  
  // Password reset operations
  passwordResetTokens: {
    create: async (tokenData: Omit<PasswordResetTokenData, 'id' | 'createdAt'>): Promise<PasswordResetTokenData> => {
      await connectDB()
      
      const token = new PasswordResetToken(tokenData)
      const savedToken = await token.save()
      
      return {
        id: savedToken._id.toString(),
        email: savedToken.email,
        token: savedToken.token,
        expiresAt: savedToken.expiresAt.toISOString(),
        used: savedToken.used,
        createdAt: savedToken.createdAt.toISOString()
      }
    },
    
    findByToken: async (token: string): Promise<PasswordResetTokenData | null> => {
      await connectDB()
      
      const resetToken = await PasswordResetToken.findOne({ 
        token, 
        used: false,
        expiresAt: { $gt: new Date() }
      })
      
      if (!resetToken) return null
      
      return {
        id: resetToken._id.toString(),
        email: resetToken.email,
        token: resetToken.token,
        expiresAt: resetToken.expiresAt.toISOString(),
        used: resetToken.used,
        createdAt: resetToken.createdAt.toISOString()
      }
    },
    
    markAsUsed: async (token: string): Promise<boolean> => {
      await connectDB()
      
      const result = await PasswordResetToken.updateOne(
        { token },
        { used: true }
      )
      
      return result.modifiedCount > 0
    },
    
    cleanupExpired: async (): Promise<void> => {
      await connectDB()
      
      // MongoDB TTL index will automatically delete expired tokens
      // But we can also manually clean up used tokens older than 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
      await PasswordResetToken.deleteMany({
        used: true,
        createdAt: { $lt: oneDayAgo }
      })
    }
  },
  
  // Message operations
  messages: {
    create: async (messageData: {
      message: string
      username: string
      room?: string
      device: {
        isMobile: boolean
        userAgent: string
      }
    }): Promise<any> => {
      await connectDB()
      
      const message = new Message(messageData)
      const savedMessage = await message.save()
      
      return {
        id: savedMessage._id.toString(),
        message: savedMessage.message,
        username: savedMessage.username,
        room: savedMessage.room,
        timestamp: savedMessage.createdAt.toISOString(),
        device: savedMessage.device
      }
    },
    
    getAll: async (room: string = 'global'): Promise<any[]> => {
      await connectDB()
      
      const messages = await Message.find({ room })
        .sort({ createdAt: -1 })
        .limit(100)
      
      return messages.map(message => ({
        id: message._id.toString(),
        message: message.message,
        username: message.username,
        room: message.room,
        timestamp: message.createdAt.toISOString(),
        device: message.device
      }))
    }
  }
}
