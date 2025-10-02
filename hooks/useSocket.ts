import { useEffect, useState } from 'react';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulamos conexión para mantener compatibilidad con el componente
    setIsConnected(true);
    
    // En un entorno real, podrías hacer ping al servidor para verificar conectividad
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/socket');
        setIsConnected(response.ok);
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkConnection();
    
    // Verificar conexión cada 30 segundos
    const interval = setInterval(checkConnection, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { socket: null, isConnected };
};