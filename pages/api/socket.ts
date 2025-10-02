import { NextApiRequest, NextApiResponse } from 'next'

// Simulate an in-memory database (in production you would use a real database)
let messages: any[] = []
let users: any[] = []

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
    res.status(200).json({ 
      messages,
      users,
      status: 'ok',
      timestamp: new Date().toISOString()
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

    const newMessage = {
      id: Date.now().toString(),
      message: message.trim(),
      username,
      room: room || 'global',
      timestamp: new Date().toISOString()
    }

    messages.push(newMessage)
    
    // Keep only the last 100 messages
    if (messages.length > 100) {
      messages = messages.slice(-100)
    }

    res.status(200).json({ 
      message: 'Message sent',
      data: newMessage,
      status: 'ok'
    })
    return
  }

  res.status(405).json({ error: 'Method not allowed' })
}