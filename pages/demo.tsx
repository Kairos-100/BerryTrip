import { useState } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { ChevronLeft, ChevronRight, ArrowLeft, MapPin, Shield, Users, MessageCircle, Star, Globe, Wifi, WifiOff } from 'lucide-react'
import { useTranslation } from 'next-i18next'

export default function DemoPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Welcome to BerryTrip Demo",
      subtitle: "The first platform designed exclusively for women traveling alone",
      content: (
        <div className="text-center">
          <div className="w-32 h-32 berry-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">BerryTrip</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A safe space for women travelers to connect, book accommodations, and travel with confidence.
          </p>
        </div>
      )
    },
    {
      title: "Platform Overview",
      subtitle: "Experience the actual BerryTrip interface",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Platform Preview</h3>
              <p className="text-gray-600">See how BerryTrip looks and works in real-time</p>
            </div>
            
            {/* Mock Platform Interface */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header */}
              <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 berry-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <span className="ml-2 text-xl font-bold text-berry-600">BerryTrip</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">🌐 EN</span>
                  <button 
                    onClick={() => router.push('/signup')}
                    className="px-4 py-2 bg-berry-600 text-white rounded-lg text-sm hover:bg-berry-700"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 px-6 py-12 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Travel Safe with <span className="text-berry-600">BerryTrip</span>
                </h1>
                <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                  The first platform designed exclusively for women traveling alone
                </p>
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => router.push('/signup')}
                    className="px-6 py-3 bg-berry-600 text-white rounded-lg font-semibold hover:bg-berry-700"
                  >
                    Get Started
                  </button>
                  <button className="px-6 py-3 border-2 border-berry-600 text-berry-600 rounded-lg font-semibold">
                    View Demo
                  </button>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="px-6 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 berry-gradient rounded-xl flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">Safety Map</h4>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 berry-gradient rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">Verified Places</h4>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 berry-gradient rounded-xl flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">Community</h4>
                  </div>
                  <div className="text-center p-4 bg-white border border-gray-200 rounded-lg">
                    <div className="w-12 h-12 berry-gradient rounded-xl flex items-center justify-center mx-auto mb-2">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-sm">Emergency</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Safety Map Feature",
      subtitle: "Connect with other female travelers near you",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <MapPin className="w-8 h-8 text-berry-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Safety Map</h3>
            </div>
            
            {/* Mock Map Interface */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Map Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="px-3 py-1 bg-berry-600 text-white rounded text-sm">My Location</button>
                  <span className="text-sm text-gray-600">Seoul, South Korea</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">12 women online</span>
                </div>
              </div>
              
              {/* Map Area */}
              <div className="h-80 bg-gradient-to-br from-green-100 to-blue-100 relative">
                {/* Map markers */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-berry-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-12 left-16 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-20 left-12 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-16 left-24 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-lg"></div>
                <div className="absolute top-24 left-20 w-3 h-3 bg-pink-500 rounded-full border-2 border-white shadow-lg"></div>
                
                {/* Map center indicator */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </div>
                
                {/* Map labels */}
                <div className="absolute top-4 right-4 bg-white rounded-lg p-2 shadow-lg">
                  <div className="text-xs font-semibold text-gray-700 mb-1">Nearby Travelers</div>
                  <div className="space-y-1">
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-berry-500 rounded-full mr-2"></div>
                      <span>Sarah (2 min away)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span>Maria (5 min away)</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span>Emma (8 min away)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Controls */}
              <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">Safe Places</button>
                  <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm">Emergency</button>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold">Privacy:</span> Location shared with consent only
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Real-time location sharing (with consent)
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Safe meeting points marked
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Emergency contacts nearby
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Verified Accommodations",
      subtitle: "Only safe places for women, verified by our community",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-berry-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Accommodations</h3>
            </div>
            
            {/* Search Interface */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Search in Seoul (Myeongdong, Gangnam, Hongdae...)" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500"
                  />
                  <input 
                    type="date" 
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500"
                  />
                  <button className="px-6 py-2 bg-berry-600 text-white rounded-lg hover:bg-berry-700">
                    Search
                  </button>
                </div>
              </div>
              
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-3 py-1 bg-berry-600 text-white rounded-full text-sm">Women Only</button>
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">Verified</button>
                <button className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm">Top Rated</button>
              </div>
            </div>
            
            {/* Accommodations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-8 h-8 text-berry-600" />
                    </div>
                    <p className="text-sm text-gray-600">Hotel Image</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Hotel Lotte Seoul</h4>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-xs text-green-600">Verified</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Myeongdong, Seoul</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">4.9 (234 reviews)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-berry-600">$89</div>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-berry-600 text-white rounded-lg hover:bg-berry-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-8 h-8 text-berry-600" />
                    </div>
                    <p className="text-sm text-gray-600">Hostel Image</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Women Only Hostel</h4>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-berry-500 mr-1" />
                      <span className="text-xs text-berry-600">Women Only</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Gangnam, Seoul</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">4.7 (156 reviews)</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-berry-600">$35</div>
                      <div className="text-xs text-gray-500">per night</div>
                    </div>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-berry-600 text-white rounded-lg hover:bg-berry-700 text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Safety Features:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="w-3 h-3 text-green-500 mr-2" />
                  24/7 Security
                </div>
                <div className="flex items-center">
                  <Wifi className="w-3 h-3 text-blue-500 mr-2" />
                  Free WiFi
                </div>
                <div className="flex items-center">
                  <Users className="w-3 h-3 text-berry-500 mr-2" />
                  Women-Only Areas
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 text-purple-500 mr-2" />
                  Near Metro
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Global Community Chat",
      subtitle: "Connect with women from your destination in real-time",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <MessageCircle className="w-8 h-8 text-berry-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Global Chat</h3>
            </div>
            
            {/* Chat Interface */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium">Seoul, South Korea</span>
                    <span className="text-sm text-gray-500">12 women online</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <MapPin className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <Users className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="h-80 bg-white p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-berry-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-berry-600">M</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Welcome to Seoul! I'm Maria, been here for 2 weeks. Need any recommendations?</p>
                      <p className="text-xs text-gray-500 mt-1">2:30 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-berry-500 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hi Maria! I'm arriving tomorrow. Best areas to stay for first-time visitors?</p>
                    <p className="text-xs opacity-75 mt-1">2:31 PM</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-green-600">S</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Myeongdong is great for shopping and food! Very safe area too.</p>
                      <p className="text-xs text-gray-500 mt-1">2:32 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-berry-500 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Thanks! What about Gangnam? I heard it's trendy</p>
                    <p className="text-xs opacity-75 mt-1">2:33 PM</p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-purple-600">E</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                      <p className="text-sm">Gangnam is perfect! Lots of cafes and safe to walk around. I can show you around if you want!</p>
                      <p className="text-xs text-gray-500 mt-1">2:34 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 text-center">
                    <p className="text-xs text-blue-600">Emma is typing...</p>
                  </div>
                </div>
              </div>
              
              {/* Chat Input */}
              <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                  />
                  <button className="p-2 text-gray-500 hover:text-gray-700">
                    <MapPin className="w-4 h-4" />
                  </button>
                  <button className="px-4 py-2 bg-berry-600 text-white rounded-lg hover:bg-berry-700">
                    Send
                  </button>
                </div>
              </div>
            </div>
            
            {/* Available Chats Sidebar */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Available Chats</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3 bg-berry-50 rounded-lg border border-berry-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Seoul, South Korea</span>
                    <span className="text-xs bg-berry-500 text-white px-2 py-1 rounded-full">12 online</span>
                  </div>
                  <p className="text-sm text-gray-600">Latest: "Great restaurant near Myeongdong!"</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tokyo, Japan</span>
                    <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">8 online</span>
                  </div>
                  <p className="text-sm text-gray-600">Latest: "Anyone visiting temples today?"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Emergency Safety Features",
      subtitle: "Direct contact with local authorities and emergency services",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="w-8 h-8 text-red-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Emergency Button</h3>
            </div>
            
            {/* Emergency Interface */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Emergency Header */}
              <div className="bg-red-50 px-4 py-3 border-b border-red-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-red-800">Emergency Mode</span>
                  </div>
                  <span className="text-sm text-red-600">Seoul, South Korea</span>
                </div>
              </div>
              
              {/* Emergency Button */}
              <div className="p-8 text-center">
                <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                  <Shield className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Emergency Button</h4>
                <p className="text-gray-600 mb-6">Tap to contact local emergency services immediately</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-sm">112</span>
                    </div>
                    <h5 className="font-semibold text-sm">Emergency Services</h5>
                    <p className="text-xs text-gray-600">Police & Ambulance</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold text-sm">Community Alert</h5>
                    <p className="text-xs text-gray-600">Notify nearby travelers</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <h5 className="font-semibold text-sm">Location Sharing</h5>
                    <p className="text-xs text-gray-600">Share exact location</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <h5 className="font-semibold text-gray-900 mb-2">What happens when you press the button:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Your location is automatically shared with emergency services</li>
                    <li>• Nearby women travelers are notified of your emergency</li>
                    <li>• Direct connection to local police and ambulance</li>
                    <li>• Your emergency contact is automatically notified</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Multi-Language Support",
      subtitle: "Available in English, Spanish, and Korean",
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-berry-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-900">Language Support</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-4xl mb-3">🇺🇸</div>
                <h4 className="font-semibold text-lg mb-2">English</h4>
                <p className="text-sm text-gray-600">Default language for international users</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-4xl mb-3">🇪🇸</div>
                <h4 className="font-semibold text-lg mb-2">Español</h4>
                <p className="text-sm text-gray-600">Para usuarias de habla hispana</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-4xl mb-3">🇰🇷</div>
                <h4 className="font-semibold text-lg mb-2">한국어</h4>
                <p className="text-sm text-gray-600">한국 여행자를 위한 한국어 지원</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Easy Language Switching</h4>
              <p className="text-sm text-gray-600">
                Click the globe icon in the header to switch between languages instantly. 
                All content, including accommodations, chat messages, and safety information, 
                will be translated to your preferred language.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Ready to Get Started?",
      subtitle: "Join thousands of women traveling safely around the world",
      content: (
        <div className="text-center">
          <div className="w-32 h-32 berry-gradient rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Start Your Safe Journey</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of confident women travelers. Book safe accommodations, 
            connect with locals, and explore the world with peace of mind.
          </p>
          
          {/* Platform Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get with BerryTrip</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Safety Features</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Real-time safety map with nearby travelers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Verified accommodations for women only
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    One-click emergency button
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-berry-500 rounded-full mr-3"></div>
                    Global community chat support
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h4 className="font-semibold text-gray-900 mb-3">Community Benefits</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Connect with women at your destination
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Share experiences and safety tips
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    Find travel companions safely
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-berry-500 rounded-full mr-3"></div>
                    Multi-language support (EN/ES/KO)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => router.push('/signup')}
                className="px-8 py-4 berry-gradient text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Get Started Now
              </button>
              <button
                onClick={() => setCurrentSlide(0)}
                className="px-8 py-4 border-2 border-berry-600 text-berry-600 rounded-xl text-lg font-semibold hover:bg-berry-50 transition-colors"
              >
                Watch Again
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Free to join • No hidden fees • 24/7 support
            </p>
          </div>
        </div>
      )
    }
  ]

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </button>
              <div className="w-8 h-8 berry-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-2xl font-bold text-berry-600">BerryTrip Demo</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {currentSlide + 1} of {slides.length}
              </span>
              <button
                onClick={() => router.push('/signup')}
                className="px-4 py-2 bg-berry-600 text-white rounded-lg hover:bg-berry-700"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 h-1">
        <div 
          className="berry-gradient h-1 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Slide Content */}
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-600">
              {slides[currentSlide].subtitle}
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            {/* Slide Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-berry-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentSlide === slides.length - 1 ? 'Finish' : 'Next'}
              <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}
