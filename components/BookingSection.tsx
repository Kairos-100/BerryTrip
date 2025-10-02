'use client'

import { useState } from 'react'
import { Calendar, MapPin, Star, Shield, Users, Search, Filter } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface BookingSectionProps {
  user: any
}

export default function BookingSection({ user }: BookingSectionProps) {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' })
  const [guests, setGuests] = useState(1)

  // Datos simulados de alojamientos verificados en Seúl
  const accommodations = [
    {
      id: 1,
      name: 'Hotel Lotte Seoul Myeongdong',
      location: 'Myeongdong, Seúl, Corea del Sur',
      price: 120,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      verified: true,
      womenOnly: false,
      safetyFeatures: ['Cámaras 24/7', 'Recepción 24h', 'Zona segura', 'Cerca metro'],
      reviews: 234
    },
    {
      id: 2,
      name: 'Hostel Korea Gangnam',
      location: 'Gangnam, Seúl, Corea del Sur',
      price: 35,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
      verified: true,
      womenOnly: true,
      safetyFeatures: ['Solo mujeres', 'Código de acceso', 'Tranquilo', 'WiFi gratis'],
      reviews: 156
    },
    {
      id: 3,
      name: 'Guesthouse Hongdae Women Only',
      location: 'Hongdae, Seúl, Corea del Sur',
      price: 28,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
      verified: true,
      womenOnly: true,
      safetyFeatures: ['Solo mujeres', 'Verificado por mujeres', 'Zona segura', 'Cerca universidad'],
      reviews: 189
    },
    {
      id: 4,
      name: 'Hotel Shilla Seoul',
      location: 'Jung-gu, Seúl, Corea del Sur',
      price: 180,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
      verified: true,
      womenOnly: false,
      safetyFeatures: ['5 estrellas', 'Seguridad premium', 'Spa', 'Cerca palacio'],
      reviews: 312
    },
    {
      id: 5,
      name: 'Hostel Insadong Traditional',
      location: 'Insadong, Seúl, Corea del Sur',
      price: 42,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1520637836862-4d197d17c0a8?w=400',
      verified: true,
      womenOnly: false,
      safetyFeatures: ['Cultura tradicional', 'Zona segura', 'Cerca templos', 'WiFi'],
      reviews: 98
    },
    {
      id: 6,
      name: 'Women Only Guesthouse Itaewon',
      location: 'Itaewon, Seúl, Corea del Sur',
      price: 38,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      verified: true,
      womenOnly: true,
      safetyFeatures: ['Solo mujeres', 'Zona internacional', 'Cerca restaurantes', 'Seguro'],
      reviews: 145
    }
  ]

  const filteredAccommodations = accommodations.filter(acc =>
    acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    acc.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <section id="reservas" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('booking.title')} <span className="text-berry-600">Seúl</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </div>

        {!user ? (
          <div className="bg-berry-50 rounded-2xl p-8 text-center">
            <Shield className="w-16 h-16 text-berry-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              {t('booking.loginRequired.title')}
            </h3>
            <p className="text-gray-600 mb-6">
              {t('booking.loginRequired.description')}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Barra de búsqueda */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={t('booking.search.placeholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={selectedDates.checkIn}
                    onChange={(e) => setSelectedDates({...selectedDates, checkIn: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    value={selectedDates.checkOut}
                    onChange={(e) => setSelectedDates({...selectedDates, checkOut: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  />
                </div>
                
                <button className="berry-gradient text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
                  <Search className="w-5 h-5 mr-2" />
                  {t('booking.search.search')}
                </button>
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Filter className="w-4 h-4 mr-2" />
                {t('booking.filters.womenOnly')}
              </button>
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Shield className="w-4 h-4 mr-2" />
                {t('booking.filters.verified')}
              </button>
              <button className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <Star className="w-4 h-4 mr-2" />
                {t('booking.filters.topRated')}
              </button>
            </div>

            {/* Lista de alojamientos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccommodations.map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={accommodation.image}
                      alt={accommodation.name}
                      className="w-full h-48 object-cover"
                    />
                    {accommodation.verified && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Shield className="w-4 h-4 mr-1" />
                          {t('booking.accommodation.verified')}
                        </div>
                      </div>
                    )}
                    {accommodation.womenOnly && (
                      <div className="absolute top-4 left-4">
                        <div className="bg-berry-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {t('booking.accommodation.womenOnly')}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {accommodation.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-berry-600">
                          €{accommodation.price}
                        </div>
                        <div className="text-sm text-gray-500">{t('booking.accommodation.perNight')}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{accommodation.location}</span>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(accommodation.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">
                        {accommodation.rating} ({accommodation.reviews} {t('booking.accommodation.reviews')})
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {accommodation.safetyFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <Shield className="w-3 h-3 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <button className="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                      {t('booking.accommodation.viewDetails')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
