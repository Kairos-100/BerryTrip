import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';

interface Message {
  id: string;
  message: string;
  username: string;
  timestamp: Date;
}

export const useChat = () => {
  const { socket, isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    if (!socket) return;

    // Escuchar nuevos mensajes
    socket.on('newMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Escuchar actualización de usuarios conectados
    socket.on('userCount', (count) => {
      setUserCount(count);
    });

    // Cargar mensajes existentes
    const loadMessages = async () => {
      try {
        const response = await fetch('/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error cargando mensajes:', error);
      }
    };

    loadMessages();

    return () => {
      socket.off('newMessage');
      socket.off('userCount');
    };
  }, [socket]);

  const sendMessage = (message: string, username: string = 'Usuario') => {
    if (socket && message.trim()) {
      socket.emit('sendMessage', {
        message: message.trim(),
        username,
        room: 'global'
      });
    }
  };

  return {
    messages,
    userCount,
    sendMessage,
    isConnected
  };
};
