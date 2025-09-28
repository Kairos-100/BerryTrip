import { prisma } from './prisma.js'

// Funciones para usuarios
export const createUser = async (userData) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: userData.password, // En producción, hashear la contraseña
        isAdmin: userData.isAdmin || false,
        isVerified: userData.isVerified || false,
        documentType: userData.documentType,
        documentNumber: userData.documentNumber,
        country: userData.country,
        avatar: userData.avatar
      }
    })
    return user
  } catch (error) {
    console.error('Error creando usuario:', error)
    throw error
  }
}

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        locations: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    })
    return user
  } catch (error) {
    console.error('Error obteniendo usuario:', error)
    throw error
  }
}

export const updateUserLocation = async (userId, locationData) => {
  try {
    // Desactivar ubicaciones anteriores
    await prisma.userLocation.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false }
    })

    // Crear nueva ubicación
    const location = await prisma.userLocation.create({
      data: {
        userId,
        latitude: locationData.lat,
        longitude: locationData.lng,
        accuracy: locationData.accuracy,
        isActive: true
      }
    })
    return location
  } catch (error) {
    console.error('Error actualizando ubicación:', error)
    throw error
  }
}

// Funciones para salas de chat
export const getOrCreateChatRoom = async (country, city) => {
  try {
    const roomName = `${city}, ${country}`
    
    let chatRoom = await prisma.chatRoom.findFirst({
      where: {
        country,
        city,
        isActive: true
      }
    })

    if (!chatRoom) {
      chatRoom = await prisma.chatRoom.create({
        data: {
          name: roomName,
          country,
          city,
          description: `Sala de chat para mujeres en ${roomName}`
        }
      })
    }

    return chatRoom
  } catch (error) {
    console.error('Error obteniendo/creando sala de chat:', error)
    throw error
  }
}

export const addUserToChatRoom = async (userId, chatRoomId) => {
  try {
    const member = await prisma.chatMember.upsert({
      where: {
        userId_chatRoomId: {
          userId,
          chatRoomId
        }
      },
      update: {
        isActive: true,
        joinedAt: new Date(),
        leftAt: null
      },
      create: {
        userId,
        chatRoomId,
        isActive: true
      }
    })
    return member
  } catch (error) {
    console.error('Error agregando usuario a sala:', error)
    throw error
  }
}

export const removeUserFromChatRoom = async (userId, chatRoomId) => {
  try {
    const member = await prisma.chatMember.updateMany({
      where: {
        userId,
        chatRoomId,
        isActive: true
      },
      data: {
        isActive: false,
        leftAt: new Date()
      }
    })
    return member
  } catch (error) {
    console.error('Error removiendo usuario de sala:', error)
    throw error
  }
}

// Funciones para mensajes
export const saveMessage = async (messageData) => {
  try {
    const message = await prisma.message.create({
      data: {
        userId: messageData.userId,
        chatRoomId: messageData.chatRoomId,
        content: messageData.content,
        messageType: messageData.messageType || 'text',
        metadata: messageData.metadata ? JSON.stringify(messageData.metadata) : null
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
    return message
  } catch (error) {
    console.error('Error guardando mensaje:', error)
    throw error
  }
}

export const getChatRoomMessages = async (chatRoomId, limit = 50) => {
  try {
    const messages = await prisma.message.findMany({
      where: { chatRoomId },
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
      take: limit
    })
    return messages.reverse() // Ordenar de más antiguo a más nuevo
  } catch (error) {
    console.error('Error obteniendo mensajes:', error)
    throw error
  }
}

export const getChatRoomMembers = async (chatRoomId) => {
  try {
    const members = await prisma.chatMember.findMany({
      where: {
        chatRoomId,
        isActive: true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
            locations: {
              where: { isActive: true },
              orderBy: { createdAt: 'desc' },
              take: 1
            }
          }
        }
      }
    })
    return members
  } catch (error) {
    console.error('Error obteniendo miembros de sala:', error)
    throw error
  }
}

// Funciones para usuarios cercanos
export const getNearbyUsers = async (userLat, userLng, radiusKm = 10) => {
  try {
    // Obtener todas las ubicaciones activas
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

    // Filtrar por distancia
    const nearbyUsers = locations
      .map(location => {
        const distance = calculateDistance(
          userLat,
          userLng,
          location.latitude,
          location.longitude
        )
        return {
          ...location.user,
          location: {
            lat: location.latitude,
            lng: location.longitude,
            accuracy: location.accuracy
          },
          distance,
          lastSeen: location.updatedAt
        }
      })
      .filter(user => user.distance <= radiusKm)
      .sort((a, b) => a.distance - b.distance)

    return nearbyUsers
  } catch (error) {
    console.error('Error obteniendo usuarios cercanos:', error)
    throw error
  }
}

// Función para calcular distancia (fórmula de Haversine)
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

// Funciones para estadísticas
export const getChatRoomStats = async (chatRoomId) => {
  try {
    const [messageCount, memberCount, lastMessage] = await Promise.all([
      prisma.message.count({
        where: { chatRoomId }
      }),
      prisma.chatMember.count({
        where: { chatRoomId, isActive: true }
      }),
      prisma.message.findFirst({
        where: { chatRoomId },
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      })
    ])

    return {
      messageCount,
      memberCount,
      lastMessage: lastMessage ? {
        content: lastMessage.content,
        user: lastMessage.user.name,
        timestamp: lastMessage.createdAt
      } : null
    }
  } catch (error) {
    console.error('Error obteniendo estadísticas de sala:', error)
    throw error
  }
}

export const getAllChatRooms = async () => {
  try {
    const chatRooms = await prisma.chatRoom.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: {
            members: {
              where: { isActive: true }
            },
            messages: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return chatRooms.map(room => ({
      id: room.id,
      name: room.name,
      country: room.country,
      city: room.city,
      participants: room._count.members,
      messageCount: room._count.messages,
      createdAt: room.createdAt
    }))
  } catch (error) {
    console.error('Error obteniendo salas de chat:', error)
    throw error
  }
}

