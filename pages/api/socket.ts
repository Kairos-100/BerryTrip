import { NextApiRequest, NextApiResponse } from 'next'

// Simulate an in-memory database (in production you would use a real database)
let messages: any[] = []
let users: any[] = []

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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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
    const newMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      username,
      room: room || 'global',
      timestamp: new Date().toISOString(),
      device: {
        isMobile,
        userAgent: req.headers['user-agent'] || 'unknown'
      }
    }

    messages.push(newMessage)
    
    // Keep only the last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100)
    }

    res.status(200).json({ 
      message: 'Message sent',
      data: newMessage,
      status: 'ok',
      device: {
        isMobile,
        userAgent: req.headers['user-agent'] || 'unknown'
      }
    })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}