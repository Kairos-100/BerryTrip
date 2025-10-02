import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  message: string
  username: string
  room: string
  device: {
    isMobile: boolean
    userAgent: string
  }
  createdAt: Date
}

const MessageSchema = new Schema<IMessage>({
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot be more than 1000 characters']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    maxlength: [50, 'Username cannot be more than 50 characters']
  },
  room: {
    type: String,
    default: 'global',
    trim: true
  },
  device: {
    isMobile: {
      type: Boolean,
      default: false
    },
    userAgent: {
      type: String,
      default: 'unknown'
    }
  }
}, {
  timestamps: true
})

// Index for faster room-based queries
MessageSchema.index({ room: 1, createdAt: -1 })

// Limit messages per room (keep only last 100 messages)
MessageSchema.pre('save', async function(next) {
  if (this.isNew) {
    const Message = mongoose.model('Message')
    const count = await Message.countDocuments({ room: this.room })
    if (count >= 100) {
      // Remove oldest messages, keeping only the last 99
      await Message.deleteMany({ room: this.room })
        .sort({ createdAt: 1 })
        .limit(count - 99)
    }
  }
  next()
})

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)
