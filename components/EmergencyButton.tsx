'use client'

import { useState, useEffect } from 'react'
import { Phone, Shield, AlertTriangle, X, MapPin, Clock, Globe, Loader2 } from 'lucide-react'

export default function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isCalling, setIsCalling] = useState(false)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [currentCountry, setCurrentCountry] = useState<string | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const emergencyNumbers = [
    { country: 'España', countryCode: 'ES', number: '112', name: 'Emergencias', flag: '🇪🇸' },
    { country: 'Francia', countryCode: 'FR', number: '112', name: 'Urgences', flag: '🇫🇷' },
    { country: 'Italia', countryCode: 'IT', number: '112', name: 'Emergenza', flag: '🇮🇹' },
    { country: 'Alemania', countryCode: 'DE', number: '112', name: 'Notfall', flag: '🇩🇪' },
    { country: 'Reino Unido', countryCode: 'GB', number: '999', name: 'Emergency', flag: '🇬🇧' },
    { country: 'Estados Unidos', countryCode: 'US', number: '911', name: 'Emergency', flag: '🇺🇸' },
    { country: 'México', countryCode: 'MX', number: '911', name: 'Emergencias', flag: '🇲🇽' },
    { country: 'Argentina', countryCode: 'AR', number: '911', name: 'Emergencias', flag: '🇦🇷' },
    { country: 'Colombia', countryCode: 'CO', number: '123', name: 'Emergencias', flag: '🇨🇴' },
    { country: 'Brasil', countryCode: 'BR', number: '190', name: 'Polícia', flag: '🇧🇷' },
    { country: 'Chile', countryCode: 'CL', number: '133', name: 'Carabineros', flag: '🇨🇱' },
    { country: 'Perú', countryCode: 'PE', number: '105', name: 'Policía', flag: '🇵🇪' },
    { country: 'Ecuador', countryCode: 'EC', number: '911', name: 'Emergencias', flag: '🇪🇨' },
    { country: 'Venezuela', countryCode: 'VE', number: '171', name: 'Emergencias', flag: '🇻🇪' },
    { country: 'Uruguay', countryCode: 'UY', number: '911', name: 'Emergencias', flag: '🇺🇾' },
    { country: 'Paraguay', countryCode: 'PY', number: '911', name: 'Emergencias', flag: '🇵🇾' },
    { country: 'Bolivia', countryCode: 'BO', number: '110', name: 'Policía', flag: '🇧🇴' },
    { country: 'Costa Rica', countryCode: 'CR', number: '911', name: 'Emergencias', flag: '🇨🇷' },
    { country: 'Panamá', countryCode: 'PA', number: '911', name: 'Emergencias', flag: '🇵🇦' },
    { country: 'Guatemala', countryCode: 'GT', number: '110', name: 'Policía', flag: '🇬🇹' },
    { country: 'Honduras', countryCode: 'HN', number: '911', name: 'Emergencias', flag: '🇭🇳' },
    { country: 'El Salvador', countryCode: 'SV', number: '911', name: 'Emergencias', flag: '🇸🇻' },
    { country: 'Nicaragua', countryCode: 'NI', number: '118', name: 'Policía', flag: '🇳🇮' },
    { country: 'República Dominicana', countryCode: 'DO', number: '911', name: 'Emergencias', flag: '🇩🇴' },
    { country: 'Cuba', countryCode: 'CU', number: '106', name: 'Policía', flag: '🇨🇺' },
    { country: 'Jamaica', countryCode: 'JM', number: '119', name: 'Police', flag: '🇯🇲' },
    { country: 'Trinidad y Tobago', countryCode: 'TT', number: '999', name: 'Emergency', flag: '🇹🇹' },
    { country: 'Canadá', countryCode: 'CA', number: '911', name: 'Emergency', flag: '🇨🇦' },
    { country: 'Australia', countryCode: 'AU', number: '000', name: 'Emergency', flag: '🇦🇺' },
    { country: 'Nueva Zelanda', countryCode: 'NZ', number: '111', name: 'Emergency', flag: '🇳🇿' },
    { country: 'Japón', countryCode: 'JP', number: '110', name: '警察', flag: '🇯🇵' },
    { country: 'China', countryCode: 'CN', number: '110', name: '警察', flag: '🇨🇳' },
    { country: 'India', countryCode: 'IN', number: '100', name: 'Police', flag: '🇮🇳' },
    { country: 'Tailandia', countryCode: 'TH', number: '191', name: 'Police', flag: '🇹🇭' },
    { country: 'Singapur', countryCode: 'SG', number: '999', name: 'Police', flag: '🇸🇬' },
    { country: 'Malasia', countryCode: 'MY', number: '999', name: 'Emergency', flag: '🇲🇾' },
    { country: 'Indonesia', countryCode: 'ID', number: '110', name: 'Police', flag: '🇮🇩' },
    { country: 'Filipinas', countryCode: 'PH', number: '911', name: 'Emergency', flag: '🇵🇭' },
    { country: 'Vietnam', countryCode: 'VN', number: '113', name: 'Police', flag: '🇻🇳' },
    { country: 'Corea del Sur', countryCode: 'KR', number: '112', name: 'Police', flag: '🇰🇷' },
    { country: 'Rusia', countryCode: 'RU', number: '102', name: 'Полиция', flag: '🇷🇺' },
    { country: 'Turquía', countryCode: 'TR', number: '155', name: 'Polis', flag: '🇹🇷' },
    { country: 'Egipto', countryCode: 'EG', number: '122', name: 'Police', flag: '🇪🇬' },
    { country: 'Sudáfrica', countryCode: 'ZA', number: '10111', name: 'Police', flag: '🇿🇦' },
    { country: 'Nigeria', countryCode: 'NG', number: '199', name: 'Police', flag: '🇳🇬' },
    { country: 'Kenia', countryCode: 'KE', number: '999', name: 'Emergency', flag: '🇰🇪' },
    { country: 'Marruecos', countryCode: 'MA', number: '19', name: 'Police', flag: '🇲🇦' },
    { country: 'Túnez', countryCode: 'TN', number: '197', name: 'Police', flag: '🇹🇳' },
    { country: 'Argelia', countryCode: 'DZ', number: '17', name: 'Police', flag: '🇩🇿' },
    { country: 'Libia', countryCode: 'LY', number: '1515', name: 'Police', flag: '🇱🇾' },
    { country: 'Etiopía', countryCode: 'ET', number: '991', name: 'Police', flag: '🇪🇹' },
    { country: 'Ghana', countryCode: 'GH', number: '191', name: 'Police', flag: '🇬🇭' },
    { country: 'Senegal', countryCode: 'SN', number: '17', name: 'Police', flag: '🇸🇳' },
    { country: 'Costa de Marfil', countryCode: 'CI', number: '111', name: 'Police', flag: '🇨🇮' },
    { country: 'Camerún', countryCode: 'CM', number: '117', name: 'Police', flag: '🇨🇲' },
    { country: 'Uganda', countryCode: 'UG', number: '999', name: 'Emergency', flag: '🇺🇬' },
    { country: 'Tanzania', countryCode: 'TZ', number: '112', name: 'Emergency', flag: '🇹🇿' },
    { country: 'Zimbabue', countryCode: 'ZW', number: '995', name: 'Police', flag: '🇿🇼' },
    { country: 'Botsuana', countryCode: 'BW', number: '999', name: 'Emergency', flag: '🇧🇼' },
    { country: 'Namibia', countryCode: 'NA', number: '10111', name: 'Police', flag: '🇳🇦' },
    { country: 'Zambia', countryCode: 'ZM', number: '991', name: 'Police', flag: '🇿🇲' },
    { country: 'Malawi', countryCode: 'MW', number: '997', name: 'Police', flag: '🇲🇼' },
    { country: 'Mozambique', countryCode: 'MZ', number: '119', name: 'Police', flag: '🇲🇿' },
    { country: 'Madagascar', countryCode: 'MG', number: '117', name: 'Police', flag: '🇲🇬' },
    { country: 'Mauricio', countryCode: 'MU', number: '999', name: 'Emergency', flag: '🇲🇺' },
    { country: 'Seychelles', countryCode: 'SC', number: '999', name: 'Emergency', flag: '🇸🇨' },
    { country: 'Reunión', countryCode: 'RE', number: '17', name: 'Police', flag: '🇷🇪' },
    { country: 'Mayotte', countryCode: 'YT', number: '17', name: 'Police', flag: '🇾🇹' },
    { country: 'Comoras', countryCode: 'KM', number: '17', name: 'Police', flag: '🇰🇲' },
    { country: 'Yibuti', countryCode: 'DJ', number: '17', name: 'Police', flag: '🇩🇯' },
    { country: 'Somalia', countryCode: 'SO', number: '888', name: 'Police', flag: '🇸🇴' },
    { country: 'Eritrea', countryCode: 'ER', number: '113', name: 'Police', flag: '🇪🇷' },
    { country: 'Sudán', countryCode: 'SD', number: '999', name: 'Emergency', flag: '🇸🇩' },
    { country: 'Sudán del Sur', countryCode: 'SS', number: '999', name: 'Emergency', flag: '🇸🇸' },
    { country: 'Chad', countryCode: 'TD', number: '17', name: 'Police', flag: '🇹🇩' },
    { country: 'República Centroafricana', countryCode: 'CF', number: '117', name: 'Police', flag: '🇨🇫' },
    { country: 'República Democrática del Congo', countryCode: 'CD', number: '112', name: 'Police', flag: '🇨🇩' },
    { country: 'República del Congo', countryCode: 'CG', number: '117', name: 'Police', flag: '🇨🇬' },
    { country: 'Gabón', countryCode: 'GA', number: '1730', name: 'Police', flag: '🇬🇦' },
    { country: 'Guinea Ecuatorial', countryCode: 'GQ', number: '113', name: 'Police', flag: '🇬🇶' },
    { country: 'Santo Tomé y Príncipe', countryCode: 'ST', number: '112', name: 'Police', flag: '🇸🇹' },
    { country: 'Angola', countryCode: 'AO', number: '113', name: 'Police', flag: '🇦🇴' },
    { country: 'Cabo Verde', countryCode: 'CV', number: '132', name: 'Police', flag: '🇨🇻' },
    { country: 'Guinea-Bisáu', countryCode: 'GW', number: '117', name: 'Police', flag: '🇬🇼' },
    { country: 'Guinea', countryCode: 'GN', number: '117', name: 'Police', flag: '🇬🇳' },
    { country: 'Sierra Leona', countryCode: 'SL', number: '999', name: 'Emergency', flag: '🇸🇱' },
    { country: 'Liberia', countryCode: 'LR', number: '911', name: 'Emergency', flag: '🇱🇷' },
    { country: 'Burkina Faso', countryCode: 'BF', number: '17', name: 'Police', flag: '🇧🇫' },
    { country: 'Malí', countryCode: 'ML', number: '17', name: 'Police', flag: '🇲🇱' },
    { country: 'Níger', countryCode: 'NE', number: '17', name: 'Police', flag: '🇳🇪' },
    { country: 'Benín', countryCode: 'BJ', number: '117', name: 'Police', flag: '🇧🇯' },
    { country: 'Togo', countryCode: 'TG', number: '117', name: 'Police', flag: '🇹🇬' },
    { country: 'Ruanda', countryCode: 'RW', number: '112', name: 'Police', flag: '🇷🇼' },
    { country: 'Burundi', countryCode: 'BI', number: '112', name: 'Police', flag: '🇧🇮' }
  ]

  // Función para obtener el país basado en las coordenadas
  const getCountryFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=es`
      )
      const data = await response.json()
      return data.countryCode
    } catch (error) {
      console.error('Error obteniendo país:', error)
      return null
    }
  }

  // Función para obtener la ubicación del usuario
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoadingLocation(true)
      setLocationError(null)
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          
          setUserLocation({ lat, lng })
          
          // Obtener el país basado en las coordenadas
          const countryCode = await getCountryFromCoordinates(lat, lng)
          if (countryCode) {
            setCurrentCountry(countryCode)
          }
          
          setIsLoadingLocation(false)
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error)
          setLocationError('No se pudo obtener tu ubicación. Por favor, comparte tu ubicación manualmente.')
          setIsLoadingLocation(false)
        }
      )
    } else {
      setLocationError('Tu navegador no soporta geolocalización.')
    }
  }

  // Obtener el número de emergencia del país actual
  const getCurrentCountryEmergency = () => {
    if (!currentCountry) return null
    return emergencyNumbers.find(emergency => emergency.countryCode === currentCountry)
  }

  // Obtener números de emergencia por región
  const getEmergencyNumbersByRegion = () => {
    const currentEmergency = getCurrentCountryEmergency()
    if (currentEmergency) {
      return [currentEmergency, ...emergencyNumbers.filter(e => e.countryCode !== currentCountry).slice(0, 5)]
    }
    return emergencyNumbers.slice(0, 6)
  }

  const handleEmergencyCall = (number: string) => {
    setIsCalling(true)
    
    // Simular llamada de emergencia
    setTimeout(() => {
      window.open(`tel:${number}`, '_self')
      setIsCalling(false)
      setIsOpen(false)
    }, 2000)
  }

  const shareLocation = () => {
    if (userLocation) {
      const locationUrl = `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`
      window.open(locationUrl, '_blank')
    }
  }

  // Auto-detectar ubicación al abrir el modal
  useEffect(() => {
    if (isOpen && !userLocation && !isLoadingLocation) {
      getCurrentLocation()
    }
  }, [isOpen])

  const currentEmergency = getCurrentCountryEmergency()

  return (
    <>
      {/* Botón flotante de emergencia */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="emergency-button text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform"
          title="Botón de Emergencia"
        >
          <AlertTriangle className="w-8 h-8" />
        </button>
      </div>

      {/* Modal de emergencia */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-red-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="w-8 h-8 mr-3" />
                  <div>
                    <h2 className="text-2xl font-bold">Emergencia</h2>
                    <p className="text-red-100">¿Necesitas ayuda inmediata?</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-red-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Contenido */}
            <div className="p-6 space-y-6">
              {/* Información de ubicación */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-red-500" />
                  Tu Ubicación
                </h3>
                
                {isLoadingLocation ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    <span className="text-sm text-gray-600">Detectando tu ubicación...</span>
                  </div>
                ) : locationError ? (
                  <div className="text-sm text-red-600 mb-3">{locationError}</div>
                ) : userLocation ? (
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="w-4 h-4 mr-2" />
                      <span>Ubicación detectada</span>
                    </div>
                    {currentEmergency && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-2">{currentEmergency.flag}</span>
                          <div>
                            <p className="font-semibold text-green-800">
                              {currentEmergency.country}
                            </p>
                            <p className="text-sm text-green-600">
                              Número de emergencia: {currentEmergency.number}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={shareLocation}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Compartir Ubicación
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-3">
                      Detecta automáticamente tu ubicación para mostrar el número de emergencias correcto
                    </p>
                    <button
                      onClick={getCurrentLocation}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Detectar Ubicación
                    </button>
                  </div>
                )}
              </div>

              {/* Números de emergencia */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-red-500" />
                  Llamar a Emergencias
                </h3>
                
                {/* Número de emergencia del país actual destacado */}
                {currentEmergency && (
                  <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-3xl mr-3">{currentEmergency.flag}</span>
                        <div>
                          <p className="font-bold text-red-800 text-lg">
                            {currentEmergency.country}
                          </p>
                          <p className="text-sm text-red-600">
                            {currentEmergency.name}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEmergencyCall(currentEmergency.number)}
                        disabled={isCalling}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center font-bold text-lg"
                      >
                        {isCalling ? (
                          <>
                            <Clock className="w-5 h-5 mr-2 animate-spin" />
                            Llamando...
                          </>
                        ) : (
                          <>
                            <Phone className="w-5 h-5 mr-2" />
                            {currentEmergency.number}
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Otros números de emergencia */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 mb-3">
                    Otros números de emergencia:
                  </p>
                  {getEmergencyNumbersByRegion().slice(1, 6).map((emergency, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{emergency.flag}</span>
                        <div>
                          <p className="font-medium text-gray-900">{emergency.country}</p>
                          <p className="text-sm text-gray-600">{emergency.name}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEmergencyCall(emergency.number)}
                        disabled={isCalling}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center"
                      >
                        {isCalling ? (
                          <>
                            <Clock className="w-4 h-4 mr-2 animate-spin" />
                            Llamando...
                          </>
                        ) : (
                          <>
                            <Phone className="w-4 h-4 mr-2" />
                            {emergency.number}
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Información Importante
                    </h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Mantén la calma y habla claramente</li>
                      <li>• Proporciona tu ubicación exacta</li>
                      <li>• Describe la situación de emergencia</li>
                      <li>• No cuelgues hasta que te lo indiquen</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botón de cierre */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}