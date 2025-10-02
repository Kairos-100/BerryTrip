import mongoose, { Document, Schema } from 'mongoose'

export interface IPasswordResetToken extends Document {
  email: string
  token: string
  expiresAt: Date
  used: boolean
  createdAt: Date
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>({
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
    unique: true
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required'],
    index: { expireAfterSeconds: 0 } // MongoDB TTL index
  },
  used: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for faster token lookups
PasswordResetTokenSchema.index({ token: 1 })
PasswordResetTokenSchema.index({ email: 1 })

// TTL index to automatically delete expired tokens
PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

export default mongoose.models.PasswordResetToken || mongoose.model<IPasswordResetToken>('PasswordResetToken', PasswordResetTokenSchema)
