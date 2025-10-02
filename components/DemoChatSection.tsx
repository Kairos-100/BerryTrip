'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, Users, MapPin, Send, Smile, Image, Phone, Globe, Wifi, WifiOff } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

export default function DemoChatSection() {
  const { t } = useTranslation()
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [message, setMessage] = useState('')
  const [activeChat, setActiveChat] = useState('')
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Demo data
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: 'Maria',
      message: '¡Hola! ¿Alguien más está en Seúl?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: 2,
      username: 'Sarah',
      message: '¡Sí! Yo estoy en Gangnam. ¿Te gustaría conocernos?',
      timestamp: new Date(Date.now() - 1000 * 60 * 25)
    },
    {
      id: 3,
      username: 'Emma',
      message: '¡Perfecto! Estoy en Myeongdong. ¿Dónde podemos encontrarnos?',
      timestamp: new Date(Date.now() - 1000 * 60 * 20)
    }
  ])
  const [userCount] = useState(12)
  const [isConnected] = useState(true)
  const [isLoading] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [typingUsers, setTypingUsers] = useState<any[]>([])
  
  // Location functionality - simplified for now
  const [location, setLocation] = useState<any>(null)
  const [nearbyUsers, setNearbyUsers] = useState<any[]>([])
  
  // Simplified functions
  const sendMessage = async (message: string) => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        username: 'Tú',
        message: message,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
    }
  }
  
  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      // Demo mode - simulate location
      const loc = {
        lat: 37.5665 + (Math.random() - 0.5) * 0.01,
        lng: 126.9780 + (Math.random() - 0.5) * 0.01
      }
      setLocation(loc)
      setIsLocationEnabled(true)
      resolve(loc)
    })
  }
  
  const shareLocationInChat = async (loc: any) => {
    if (loc) {
      const locationMessage = `📍 Ubicación compartida: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`
      const newMessage = {
        id: messages.length + 1,
        username: 'Tú',
        message: locationMessage,
        timestamp: new Date()
      }
      setMessages([...messages, newMessage])
    }
  }
  
  const startTyping = () => {
    // Simplified typing functionality
  }
  
  const stopTyping = () => {
    // Simplified typing functionality
  }
  
  const findNearbyUsers = (radius: number) => {
    // Simplified nearby users functionality
    setNearbyUsers([])
  }

  const countries = [
    { code: 'ES', name: 'España', cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla'] },
    { code: 'FR', name: 'Francia', cities: ['París', 'Lyon', 'Marsella', 'Toulouse'] },
    { code: 'IT', name: 'Italia', cities: ['Roma', 'Milán', 'Nápoles', 'Florencia'] },
    { code: 'DE', name: 'Alemania', cities: ['Berlín', 'Múnich', 'Hamburgo', 'Colonia'] },
    { code: 'KR', name: 'Corea del Sur', cities: ['Seúl', 'Busan', 'Incheon', 'Daegu'] },
    { code: 'JP', name: 'Japón', cities: ['Tokio', 'Osaka', 'Kioto', 'Yokohama'] },
    { code: 'US', name: 'Estados Unidos', cities: ['Nueva York', 'Los Ángeles', 'Chicago', 'Miami'] },
    { code: 'MX', name: 'México', cities: ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Cancún'] },
    { code: 'AR', name: 'Argentina', cities: ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza'] },
    { code: 'BR', name: 'Brasil', cities: ['São Paulo', 'Río de Janeiro', 'Brasilia', 'Salvador'] }
  ]

  // Datos simulados de chats (ahora se generan dinámicamente)
  const [availableChats, setAvailableChats] = useState<any[]>([])

  // Generar salas de chat basadas en países y ciudades
  useEffect(() => {
    const chats: any[] = []
    countries.forEach(country => {
      country.cities.forEach(city => {
        chats.push({
          id: `${country.code}-${city.toLowerCase().replace(/\s+/g, '-')}`,
          name: `${city}, ${country.name}`,
          country: country.name,
          city: city,
          participants: Math.floor(Math.random() * 50) + 5,
          lastMessage: '¡Únete a la conversación!',
          lastTime: 'Ahora',
          unread: 0
        })
      })
    })
    setAvailableChats(chats)
  }, [])

  // Filtrar chats por país y ciudad seleccionados
  const filteredChats = availableChats.filter(chat => {
    if (selectedCountry && selectedCity) {
      const country = countries.find(c => c.code === selectedCountry)
      return country && country.cities.includes(selectedCity) && 
             chat.country === country.name && chat.city === selectedCity
    }
    return true
  })

  // Auto-scroll a mensajes nuevos
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Obtener ubicación del usuario
  const handleGetLocation = async () => {
    try {
      await getCurrentLocation()
      setShowLocationModal(false)
      findNearbyUsers(10) // 10km de radio
    } catch (error) {
      console.error('Error obteniendo ubicación:', error)
    }
  }

  // Enviar mensaje
  const handleSendMessage = async () => {
    if (message.trim() && activeChat) {
      await sendMessage(message)
      setMessage('')
    }
  }

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Manejar escritura
  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    if (e.target.value.length > 0) {
      startTyping()
    } else {
      stopTyping()
    }
  }

  // Compartir ubicación en el chat
  const handleShareLocation = () => {
    if (location && activeChat) {
      shareLocationInChat(location)
    }
  }

  // Formatear tiempo
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <section id="chat" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('chat.title')} <span className="text-berry-600">Global</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('chat.subtitle')}
          </p>
          
          {/* Estado de conexión */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            {isConnected ? (
              <div className="flex items-center text-green-600">
                <Wifi className="w-4 h-4 mr-1" />
                <span className="text-sm">{t('chat.status.connected')}</span>
              </div>
            ) : (
              <div className="flex items-center text-red-600">
                <WifiOff className="w-4 h-4 mr-1" />
                <span className="text-sm">{t('chat.status.disconnected')}</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de chats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-berry-600" />
                {t('chat.availableChats')}
              </h3>
              
              {/* Selector de país y ciudad */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('chat.country')}
                  </label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  >
                    <option value="">{t('chat.selectCountry')}</option>
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedCountry && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('chat.city')}
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                    >
                      <option value="">{t('chat.selectCity')}</option>
                      {countries.find(c => c.code === selectedCountry)?.cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Botón de ubicación */}
              <div className="mb-6">
                <button
                  onClick={() => setShowLocationModal(true)}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {isLocationEnabled ? t('chat.location.activated') : t('chat.location.activate')}
                </button>
              </div>

              {/* Lista de chats */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat.id)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeChat === chat.id
                        ? 'bg-berry-50 border-2 border-berry-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{chat.name}</h4>
                      {chat.unread > 0 && (
                        <span className="bg-berry-500 text-white text-xs px-2 py-1 rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {chat.lastMessage}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {userCount} {t('chat.chat.womenOnline')}
                      </span>
                      <span>{chat.lastTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat activo */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg h-[600px] flex flex-col">
              {activeChat ? (
                <>
                  {/* Header del chat */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {availableChats.find(c => c.id === activeChat)?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {userCount} {t('chat.chat.womenOnline')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleShareLocation}
                        disabled={!location}
                        className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        title={t('chat.chat.shareLocation')}
                      >
                        <MapPin className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <Users className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Mensajes */}
                  <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {isLoading && messages.length === 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="text-gray-500">{t('chat.chat.loadingMessages')}</div>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.username === 'Tú' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.username === 'Tú'
                                ? 'bg-berry-500 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {msg.username !== 'Tú' && (
                              <p className="text-xs font-semibold mb-1 opacity-75">
                                {msg.username}
                              </p>
                            )}
                            <p className="text-sm">{msg.message}</p>
                            <p className="text-xs mt-1 opacity-75">
                              {formatTime(new Date(msg.timestamp))}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    
                    {/* Usuarios escribiendo */}
                    {typingUsers.length > 0 && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm">
                          {typingUsers.map(u => u.name).join(', ')} {t('chat.chat.typing')}
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input de mensaje */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex space-x-2">
                      <div className="flex-1 flex items-center space-x-2">
                        <input
                          type="text"
                          value={message}
                          onChange={handleTyping}
                          onKeyPress={handleKeyPress}
                          placeholder={t('chat.chat.messagePlaceholder')}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                        />
                        <button className="p-3 text-gray-400 hover:text-gray-600">
                          <Smile className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-gray-400 hover:text-gray-600">
                          <Image className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="berry-gradient text-white p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg">{t('chat.chat.selectChat')}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal de ubicación */}
        {showLocationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {t('chat.location.modal.title')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {t('chat.location.modal.description')}
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setShowLocationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    {t('chat.location.modal.cancel')}
                  </button>
                  <button
                    onClick={handleGetLocation}
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    {t('chat.location.modal.activate')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
