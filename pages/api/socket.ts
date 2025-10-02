import { NextApiRequest, NextApiResponse } from 'next'

// Simulamos una base de datos en memoria (en producción usarías una base de datos real)
let messages: any[] = []
let users: any[] = []

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Configurar headers CORS
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
    // Obtener mensajes
    res.status(200).json({ 
      messages,
      users,
      status: 'ok',
      timestamp: new Date().toISOString()
    })
    return
  }

  if (req.method === 'POST') {
    // Enviar mensaje
    const { message, username, room } = req.body
    
    if (!message || !username) {
      res.status(400).json({ error: 'Mensaje y usuario son requeridos' })
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
    
    // Mantener solo los últimos 100 mensajes
    if (messages.length > 100) {
      messages = messages.slice(-100)
    }

    res.status(200).json({ 
      message: 'Mensaje enviado',
      data: newMessage,
      status: 'ok'
    })
    return
  }

  res.status(405).json({ error: 'Método no permitido' })
}