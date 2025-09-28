import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NODE_ENV === 'production' 
      ? window.location.origin
      : 'http://localhost:3000'
    );

    socketInstance.on('connect', () => {
      console.log('Conectado al servidor');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Desconectado del servidor');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.close();
    };
  }, []);

  return { socket, isConnected };
};