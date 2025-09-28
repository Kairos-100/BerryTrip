'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MapProps {
  userLocation: [number, number] | null
  nearbyUsers: any[]
}

// Iconos personalizados
const userIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#ec4899" stroke="#be185d" stroke-width="2"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
      <path d="M7 20.5C7 16.5 9.5 14 12 14s5 2.5 5 6.5" stroke="white" stroke-width="2" fill="none"/>
    </svg>
  `),
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

const nearbyUserIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0ea5e9" stroke="#0369a1" stroke-width="2"/>
      <circle cx="12" cy="9" r="3" fill="white"/>
      <path d="M7 20.5C7 16.5 9.5 14 12 14s5 2.5 5 6.5" stroke="white" stroke-width="2" fill="none"/>
    </svg>
  `),
  iconSize: [25, 25],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

function MapContent({ userLocation, nearbyUsers }: MapProps) {
  const map = useMap()

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, 10)
    }
  }, [userLocation, map])

  return null
}

export default function Map({ userLocation, nearbyUsers }: MapProps) {
  const defaultCenter: [number, number] = [40.4168, -3.7038] // Madrid como centro por defecto

  return (
    <MapContainer
      center={userLocation || defaultCenter}
      zoom={userLocation ? 10 : 6}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapContent userLocation={userLocation} nearbyUsers={nearbyUsers} />
      
      {/* Marcador del usuario */}
      {userLocation && (
        <Marker position={userLocation} icon={userIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-berry-600">Tu ubicación</h3>
              <p className="text-sm text-gray-600">Estás aquí</p>
            </div>
          </Popup>
        </Marker>
      )}
      
      {/* Marcadores de usuarios cercanos */}
      {nearbyUsers.map((user) => (
        <Marker key={user.id} position={user.location} icon={nearbyUserIcon}>
          <Popup>
            <div className="text-center">
              <h3 className="font-semibold text-safety-600">{user.name}</h3>
              <p className="text-sm text-gray-600">{user.lastSeen}</p>
              <div className="flex items-center justify-center mt-2">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-xs text-gray-500">
                  {user.status === 'online' ? 'En línea' : 'Desconectada'}
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
