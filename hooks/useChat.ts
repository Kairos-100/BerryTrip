import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';

interface Message {
  id: string;
  message: string;
  username: string;
  timestamp: string;
  room?: string;
}

export const useChat = () => {
  const { isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar mensajes existentes
  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/socket');
      const data = await response.json();
      
      if (data.messages) {
        setMessages(data.messages);
      }
      if (data.users) {
        setUserCount(data.users.length);
      }
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
    
    // Recargar mensajes cada 5 segundos para simular tiempo real
    const interval = setInterval(loadMessages, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  const sendMessage = async (message: string, username: string = 'Usuario', room: string = 'global') => {
    if (!message.trim()) return;

    try {
      const response = await fetch('/api/socket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          username,
          room
        }),
      });

      if (response.ok) {
        // Recargar mensajes después de enviar
        await loadMessages();
      } else {
        console.error('Error enviando mensaje');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
    }
  };

  return {
    messages,
    userCount,
    sendMessage,
    isConnected,
    isLoading,
    loadMessages
  };
};
