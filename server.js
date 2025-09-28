const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')
const { PrismaClient } = require('@prisma/client')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Inicializar Prisma
const prisma = new PrismaClient()

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Inicializar Socket.IO
  const io = new Server(httpServer, {
    cors: {
      origin: dev ? 'http://localhost:3000' : 'https://berrytrip.vercel.app',
      methods: ['GET', 'POST']
    }
  })

  // Almacenar usuarios conectados en memoria (para sesiones activas)
  const connectedUsers = new Map()

  io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id)

    // Unirse a una sala de chat por ubicación
    socket.on('join-room', async (data) => {
      try {
        const { roomId, user, location } = data
        
        // Obtener o crear sala de chat en la base de datos
        const chatRoom = await prisma.chatRoom.findUnique({
          where: { id: roomId }
        })

        if (!chatRoom) {
          console.error(`Sala de chat ${roomId} no encontrada`)
          return
        }

        // Agregar usuario a la sala en la base de datos
        await prisma.chatMember.upsert({
          where: {
            userId_chatRoomId: {
              userId: user.id,
              chatRoomId: roomId
            }
          },
          update: {
            isActive: true,
            joinedAt: new Date(),
            leftAt: null
          },
          create: {
            userId: user.id,
            chatRoomId: roomId,
            isActive: true
          }
        })

        // Guardar ubicación del usuario
        if (location) {
          await prisma.userLocation.updateMany({
            where: { userId: user.id, isActive: true },
            data: { isActive: false }
          })

          await prisma.userLocation.create({
            data: {
              userId: user.id,
              latitude: location.lat,
              longitude: location.lng,
              accuracy: location.accuracy,
              isActive: true
            }
          })
        }

        // Unirse a la sala de Socket.IO
        socket.join(roomId)
        
        // Guardar información del usuario en memoria
        connectedUsers.set(socket.id, {
          id: user.id,
          name: user.name,
          email: user.email,
          location: location,
          roomId: roomId,
          socketId: socket.id
        })

        // Obtener miembros de la sala desde la base de datos
        const members = await prisma.chatMember.findMany({
          where: {
            chatRoomId: roomId,
            isActive: true
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })

        // Notificar a otros usuarios en la sala
        socket.to(roomId).emit('user-joined', {
          user: {
            id: user.id,
            name: user.name,
            location: location
          },
          roomId: roomId,
          userCount: members.length
        })

        // Obtener historial de mensajes desde la base de datos
        const messages = await prisma.message.findMany({
          where: { chatRoomId: roomId },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          take: 50
        })

        // Enviar historial de mensajes al nuevo usuario
        socket.emit('room-history', {
          messages: messages.reverse(), // Ordenar de más antiguo a más nuevo
          users: members.map(m => ({
            id: m.user.id,
            name: m.user.name,
            avatar: m.user.avatar,
            joinedAt: m.joinedAt
          })),
          roomId: roomId
        })

        console.log(`Usuario ${user.name} se unió a la sala ${roomId}`)
      } catch (error) {
        console.error('Error en join-room:', error)
      }
    })

    // Enviar mensaje
    socket.on('send-message', async (data) => {
      try {
        const { roomId, message, user } = data
        
        // Guardar mensaje en la base de datos
        const savedMessage = await prisma.message.create({
          data: {
            userId: user.id,
            chatRoomId: roomId,
            content: message,
            messageType: 'text'
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })

        // Enviar mensaje a todos en la sala
        io.to(roomId).emit('new-message', {
          id: savedMessage.id,
          user: {
            id: savedMessage.user.id,
            name: savedMessage.user.name
          },
          message: savedMessage.content,
          timestamp: savedMessage.createdAt,
          roomId: roomId
        })

        console.log(`Mensaje guardado en BD: ${message}`)
      } catch (error) {
        console.error('Error enviando mensaje:', error)
      }
    })

    // Compartir ubicación
    socket.on('share-location', async (data) => {
      try {
        const { roomId, location, user } = data
        
        // Actualizar ubicación en la base de datos
        await prisma.userLocation.updateMany({
          where: { userId: user.id, isActive: true },
          data: { isActive: false }
        })

        await prisma.userLocation.create({
          data: {
            userId: user.id,
            latitude: location.lat,
            longitude: location.lng,
            accuracy: location.accuracy,
            isActive: true
          }
        })

        // Notificar a otros usuarios sobre la nueva ubicación
        socket.to(roomId).emit('location-updated', {
          user: {
            id: user.id,
            name: user.name
          },
          location: location,
          timestamp: new Date()
        })

        console.log(`Ubicación actualizada para ${user.name}:`, location)
      } catch (error) {
        console.error('Error actualizando ubicación:', error)
      }
    })

    // Obtener usuarios cercanos
    socket.on('get-nearby-users', async (data) => {
      try {
        const { userLocation, radius = 10 } = data
        
        // Obtener usuarios cercanos desde la base de datos
        const locations = await prisma.userLocation.findMany({
          where: { isActive: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true
              }
            }
          }
        })

        const nearbyUsers = locations
          .filter(location => location.userId !== data.userId) // Excluir al usuario actual
          .map(location => {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              location.latitude,
              location.longitude
            )
            return {
              id: location.user.id,
              name: location.user.name,
              location: {
                lat: location.latitude,
                lng: location.longitude,
                accuracy: location.accuracy
              },
              distance,
              lastSeen: location.updatedAt
            }
          })
          .filter(user => user.distance <= radius)
          .sort((a, b) => a.distance - b.distance)

        socket.emit('nearby-users', nearbyUsers)
      } catch (error) {
        console.error('Error obteniendo usuarios cercanos:', error)
      }
    })

    // Usuario escribiendo
    socket.on('user-typing', (data) => {
      socket.to(data.roomId).emit('user-typing', data)
    })

    socket.on('user-stop-typing', (data) => {
      socket.to(data.roomId).emit('user-stop-typing', data)
    })

    // Desconexión
    socket.on('disconnect', async () => {
      try {
        const user = connectedUsers.get(socket.id)
        
        if (user) {
          // Marcar usuario como inactivo en la sala
          await prisma.chatMember.updateMany({
            where: {
              userId: user.id,
              chatRoomId: user.roomId,
              isActive: true
            },
            data: {
              isActive: false,
              leftAt: new Date()
            }
          })

          // Obtener miembros restantes
          const remainingMembers = await prisma.chatMember.count({
            where: {
              chatRoomId: user.roomId,
              isActive: true
            }
          })

          // Notificar a otros usuarios
          socket.to(user.roomId).emit('user-left', {
            user: {
              id: user.id,
              name: user.name
            },
            userCount: remainingMembers
          })

          connectedUsers.delete(socket.id)
          console.log(`Usuario ${user.name} desconectado`)
        }
      } catch (error) {
        console.error('Error en desconexión:', error)
      }
    })
  })

  // Función para calcular distancia entre dos puntos (fórmula de Haversine)
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    const distance = R * c
    return distance
  }

  // Cleanup al cerrar el servidor
  process.on('SIGINT', async () => {
    console.log('Cerrando servidor...')
    await prisma.$disconnect()
    process.exit(0)
  })

  httpServer
    .once('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`> Servidor Socket.IO ejecutándose en http://${hostname}:${port}`)
    })
})