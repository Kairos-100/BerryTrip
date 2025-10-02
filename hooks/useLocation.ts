import { useState, useEffect } from 'react';

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
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<User[]>([]);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

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
    // Simplified - just return the current location
    return userLocation;
  };

  return {
    userLocation,
    nearbyUsers,
    isLocationEnabled,
    getCurrentLocation,
    shareLocation
  };
};
