import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../lib/database-config'

// Function to detect if the request is from a mobile device
function isMobileDevice(req: NextApiRequest): boolean {
  const userAgent = req.headers['user-agent'] || ''
  
  // Common mobile device patterns
  const mobilePatterns = [
    /Android/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Mobile/i,
    /webOS/i,
    /Opera Mini/i,
    /IEMobile/i
  ]
  
  return mobilePatterns.some(pattern => pattern.test(userAgent))
}

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

  if (req.method === 'GET') {
    // Get messages
    const isMobile = isMobileDevice(req)
    try {
      const messages = await db.messages.getAll()
      const users = await db.users.getAll()
      
      res.status(200).json({ 
        messages,
        users,
        status: 'ok',
        timestamp: new Date().toISOString(),
        device: {
          isMobile,
          userAgent: req.headers['user-agent'] || 'unknown'
        }
      })
    } catch (error) {
      console.error('Error fetching messages:', error)
      res.status(500).json({ error: 'Failed to fetch messages' })
    }
    return
  }

  if (req.method === 'POST') {
    // Send message
    const { message, username, room } = req.body
    
    if (!message || !username) {
      res.status(400).json({ error: 'Message and username are required' })
      return
    }

    const isMobile = isMobileDevice(req)
    
    try {
      const newMessage = await db.messages.create({
        message: message.trim(),
        username,
        room: room || 'global',
        device: {
          isMobile,
          userAgent: req.headers['user-agent'] || 'unknown'
        }
      })

      res.status(200).json({ 
        message: 'Message sent',
        data: newMessage,
        status: 'ok',
        device: {
          isMobile,
          userAgent: req.headers['user-agent'] || 'unknown'
        }
      })
    } catch (error) {
      console.error('Error sending message:', error)
      res.status(500).json({ error: 'Failed to send message' })
    }
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}