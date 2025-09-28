import { Server } from 'socket.io';

let io;

export const initSocket = (httpServer) => {
  if (!io) {
    io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    // Datos en memoria para simular base de datos
    let users = new Map();
    let chatRooms = new Map();
    let messages = new Map();

    // Inicializar sala de chat global
    chatRooms.set('global', {
      id: 'global',
      name: 'Chat Global',
      users: new Set(),
      messages: []
    });

    // Socket.IO connection handling
    io.on('connection', (socket) => {
      console.log('Usuario conectado:', socket.id);

      // Usuario se une al chat global
      socket.join('global');
      
      // Actualizar contador de usuarios
      io.emit('userCount', io.engine.clientsCount);

      // Manejar mensajes de chat
      socket.on('sendMessage', (data) => {
        const message = {
          id: Date.now(),
          userId: socket.id,
          username: data.username || 'Usuario',
          message: data.message,
          timestamp: new Date().toISOString(),
          room: data.room || 'global'
        };

        // Guardar mensaje
        if (!messages.has(message.room)) {
          messages.set(message.room, []);
        }
        messages.get(message.room).push(message);

        // Enviar mensaje a todos en la sala
        io.to(message.room).emit('newMessage', message);
      });

      // Manejar actualización de ubicación
      socket.on('updateLocation', (data) => {
        users.set(socket.id, {
          id: socket.id,
          username: data.username || 'Usuario',
          lat: data.lat,
          lng: data.lng,
          timestamp: new Date().toISOString()
        });

        // Enviar ubicación a todos los usuarios
        io.emit('userLocationUpdate', {
          id: socket.id,
          username: data.username || 'Usuario',
          lat: data.lat,
          lng: data.lng,
          timestamp: new Date().toISOString()
        });
      });

      // Manejar desconexión
      socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
        users.delete(socket.id);
        io.emit('userCount', io.engine.clientsCount);
      });
    });
  }
  return io;
};

export { io };