import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(process.env.NODE_ENV === 'production' 
      ? 'https://berrytrip.vercel.app' 
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