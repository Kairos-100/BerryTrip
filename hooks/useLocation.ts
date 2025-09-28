import { useState, useEffect } from 'react';
import { useSocket } from './useSocket';

interface Location {
  lat: number;
  lng: number;
  timestamp: string;
}

interface User {
  id: string;
  username: string;
  location: Location;
}

export const useLocation = () => {
  const { socket } = useSocket();
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Escuchar actualizaciones de ubicación de otros usuarios
    socket.on('userLocationUpdate', (userData) => {
      setNearbyUsers(prev => {
        const filtered = prev.filter(user => user.id !== userData.id);
        return [...filtered, userData];
      });
    });

    return () => {
      socket.off('userLocationUpdate');
    };
  }, [socket]);

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocalización no soportada por este navegador');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: new Date().toISOString()
        };
        
        setUserLocation(location);
        setIsLocationEnabled(true);

        // Enviar ubicación al servidor
        if (socket) {
          socket.emit('updateLocation', {
            ...location,
            username: 'Usuario'
          });
        }
      },
      (error) => {
        console.error('Error obteniendo ubicación:', error);
        alert('No se pudo obtener tu ubicación');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const shareLocation = () => {
    if (userLocation && socket) {
      socket.emit('updateLocation', {
        ...userLocation,
        username: 'Usuario'
      });
    }
  };

  return {
    userLocation,
    nearbyUsers,
    isLocationEnabled,
    getCurrentLocation,
    shareLocation
  };
};
