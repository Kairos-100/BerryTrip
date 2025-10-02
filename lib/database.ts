// Simple in-memory database for development
// In production, you would use a real database like PostgreSQL, MongoDB, etc.

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // hashed
  location: string
  interests: string[]
  verified: boolean
  createdAt: string
  updatedAt: string
}

export interface PasswordResetToken {
  id: string
  email: string
  token: string
  expiresAt: string
  used: boolean
  createdAt: string
}

// In-memory storage (replace with real database in production)
let users: User[] = []
let passwordResetTokens: PasswordResetToken[] = []

export const db = {
  // User operations
  users: {
    create: (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
      const user: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      users.push(user)
      return user
    },
    
    findByEmail: (email: string): User | null => {
      return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null
    },
    
    findById: (id: string): User | null => {
      return users.find(user => user.id === id) || null
    },
    
    update: (id: string, updates: Partial<User>): User | null => {
      const userIndex = users.findIndex(user => user.id === id)
      if (userIndex === -1) return null
      
      users[userIndex] = {
        ...users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      }
      return users[userIndex]
    },
    
    getAll: (): User[] => {
      return users
    }
  },
  
  // Password reset operations
  passwordResetTokens: {
    create: (tokenData: Omit<PasswordResetToken, 'id' | 'createdAt'>): PasswordResetToken => {
      const token: PasswordResetToken = {
        ...tokenData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      }
      passwordResetTokens.push(token)
      return token
    },
    
    findByToken: (token: string): PasswordResetToken | null => {
      return passwordResetTokens.find(t => t.token === token && !t.used) || null
    },
    
    markAsUsed: (token: string): boolean => {
      const tokenIndex = passwordResetTokens.findIndex(t => t.token === token)
      if (tokenIndex === -1) return false
      
      passwordResetTokens[tokenIndex].used = true
      return true
    },
    
    cleanupExpired: (): void => {
      const now = new Date()
      passwordResetTokens = passwordResetTokens.filter(token => 
        new Date(token.expiresAt) > now
      )
    }
  },
  
  // Message operations (for in-memory database)
  messages: {
    create: (messageData: {
      message: string
      username: string
      room?: string
      device: {
        isMobile: boolean
        userAgent: string
      }
    }): any => {
      const newMessage = {
        id: Date.now().toString(),
        message: messageData.message.trim(),
        username: messageData.username,
        room: messageData.room || 'global',
        timestamp: new Date().toISOString(),
        device: messageData.device
      }
      
      messages.push(newMessage)
      
      // Keep only the last 100 messages
      if (messages.length > 100) {
        messages.splice(0, messages.length - 100)
      }
      
      return newMessage
    },
    
    getAll: (room: string = 'global'): any[] => {
      return messages
        .filter(msg => msg.room === room)
        .slice(-100) // Return last 100 messages
    }
  }
}

// Clean up expired tokens every hour
setInterval(() => {
  db.passwordResetTokens.cleanupExpired()
}, 60 * 60 * 1000)
