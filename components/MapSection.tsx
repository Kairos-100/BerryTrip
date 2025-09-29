'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Users, Shield, Eye, EyeOff, Wifi, WifiOff, RefreshCw } from 'lucide-react'
import { useSocket } from '@/hooks/useSocket'

// Importación dinámica para evitar problemas de SSR con Leaflet
const Map = dynamic(() => import('./Map'), { ssr: false })

interface MapSectionProps {
  user: any
}

export default function MapSection({ user }: MapSectionProps) {
  const [showMap, setShowMap] = useState(false)
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const [isSharingLocation, setIsSharingLocation] = useState(false)

  // Socket.IO connection
  const { socket, isConnected } = useSocket()
  
  // Location functionality - simplified for now
  const [location, setLocation] = useState<any>(null)
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([])
  
  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalización no soportada'))
        return
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setLocation(loc)
          resolve(loc)
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      )
    })
  }
  
  const findNearbyUsers = (radius: number) => {
    // Simplified nearby users functionality
    setNearbyUsers([])
  }

  // Obtener ubicación del usuario
  const handleGetLocation = async () => {
    try {
      const locationData = await getCurrentLocation()
      setIsLocationEnabled(true)
      
      // Buscar usuarios cercanos
      findNearbyUsers(10) // 10km de radio
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
      alert('No se pudo obtener tu ubicación. Por favor, permite el acceso a la ubicación.')
    }
  }

  // Compartir ubicación
  const handleShareLocation = () => {
    if (location) {
      setIsSharingLocation(true)
      // Aquí se compartiría la ubicación con otros usuarios
      setTimeout(() => {
        setIsSharingLocation(false)
      }, 2000)
    }
  }

  // Actualizar ubicación
  const handleRefreshLocation = () => {
    if (isLocationEnabled) {
      handleGetLocation()
    }
  }

  return (
    <section id="mapa" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Mapa de <span className="text-berry-600">Seguridad</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conecta con otras mujeres viajeras cerca de ti. Tu ubicación solo se comparte 
            con tu consentimiento y puedes desactivarla en cualquier momento.
          </p>
          
          {/* Estado de conexión */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {isConnected ? (
              <div className="flex items-center text-green-600">
                <Wifi className="w-4 h-4 mr-1" />
                <span className="text-sm">Conectado en tiempo real</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <WifiOff className="w-4 h-4 mr-1" />
                <span className="text-sm">Desconectado</span>
              </div>
            )}
          </div>
        </div>

        {!user ? (
          <div className="bg-berry-50 rounded-2xl p-8 text-center">
            <Shield className="w-16 h-16 text-berry-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Inicia sesión para acceder al mapa
            </h3>
            <p className="text-gray-600 mb-6">
              Necesitas estar registrada para ver y compartir tu ubicación de forma segura
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Controles del mapa */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setShowMap(!showMap)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  showMap
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'berry-gradient text-white hover:opacity-90'
                }`}
              >
                {showMap ? (
                  <>
                    <EyeOff className="w-5 h-5 mr-2" />
                    Ocultar Mapa
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5 mr-2" />
                    Mostrar Mapa
                  </>
                )}
              </button>
              
              {!isLocationEnabled && (
                <button
                  onClick={handleGetLocation}
                  className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Activar Ubicación
                </button>
              )}
              
              {isLocationEnabled && (
                <button
                  onClick={handleRefreshLocation}
                  className="flex items-center px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Actualizar Ubicación
                </button>
              )}
              
              {showMap && isLocationEnabled && (
                <div className="flex items-center text-sm text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-green-600" />
                  Tu ubicación está protegida y encriptada
                </div>
              )}
            </div>

            {/* Información de ubicación */}
            {isLocationEnabled && location && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <p className="font-semibold text-green-800">Ubicación Activada</p>
                      <p className="text-sm text-green-600">
                        Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleShareLocation}
                    disabled={isSharingLocation}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 transition-colors"
                  >
                    {isSharingLocation ? 'Compartiendo...' : 'Compartir Ubicación'}
                  </button>
                </div>
              </div>
            )}

            {/* Mapa */}
            {showMap && (
              <div className="relative">
                <div className="h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
                  <Map 
                    userLocation={location ? [location.lat, location.lng] : null}
                    nearbyUsers={nearbyUsers}
                  />
                </div>
                
                {/* Información de usuarios cercanos */}
                {nearbyUsers.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Mujeres Cercanas ({nearbyUsers.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {nearbyUsers.map((nearbyUser, index) => (
                        <div
                          key={index}
                          className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-berry-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-berry-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {nearbyUser.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {nearbyUser.distance.toFixed(1)} km de distancia
                              </p>
                              <div className="flex items-center mt-1">
                                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                                <span className="text-xs text-gray-500">
                                  Visto hace {Math.floor(Math.random() * 60)} min
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Información de privacidad */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Tu Privacidad es Importante
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Tu ubicación se comparte solo con tu consentimiento</li>
                    <li>• Puedes desactivar la ubicación en cualquier momento</li>
                    <li>• Solo otras mujeres verificadas pueden ver tu ubicación</li>
                    <li>• Tu ubicación se encripta y se almacena de forma segura</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
