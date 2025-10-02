'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Play, MapPin, Shield, Users, MessageCircle, Calendar, Star, Globe, Wifi, WifiOff } from 'lucide-react'

interface DemoPresentationProps {
  onExit: () => void
}

export default function DemoPresentation({ onExit }: DemoPresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

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
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center px-6 py-3 bg-berry-600 text-white rounded-lg hover:bg-berry-700 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Tour
            </button>
            <button
              onClick={onExit}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Skip Demo
            </button>
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
            <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-green-600 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">Interactive Map</p>
                <p className="text-sm text-gray-500">Shows nearby women travelers</p>
              </div>
            </div>
            <div className="space-y-3">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Hotel Lotte Seoul</h4>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">Verified</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Myeongdong, Seoul</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">4.9 (234 reviews)</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Women Only Hostel</h4>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-berry-500 mr-1" />
                    <span className="text-xs text-berry-600">Women Only</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Gangnam, Seoul</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm ml-1">4.7 (156 reviews)</span>
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Available Chats</h4>
                <div className="space-y-2">
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
              <div>
                <h4 className="font-semibold mb-3">Live Chat</h4>
                <div className="h-48 bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-berry-500 text-white px-3 py-2 rounded-lg max-w-xs">
                      <p className="text-sm">Hi! I'm arriving in Seoul tomorrow</p>
                      <p className="text-xs opacity-75">2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-900 px-3 py-2 rounded-lg max-w-xs">
                      <p className="text-sm">Welcome! Need any recommendations?</p>
                      <p className="text-xs opacity-75">2:31 PM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-berry-500 text-white px-3 py-2 rounded-lg max-w-xs">
                      <p className="text-sm">Yes! Best areas to stay?</p>
                      <p className="text-xs opacity-75">2:32 PM</p>
                    </div>
                  </div>
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
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">One-Click Emergency</h4>
              <p className="text-gray-600">Direct contact with local police and emergency services</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">911</span>
                </div>
                <h5 className="font-semibold">Emergency Services</h5>
                <p className="text-sm text-gray-600">Local police & ambulance</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold">Community Alert</h5>
                <p className="text-sm text-gray-600">Notify nearby travelers</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold">Location Sharing</h5>
                <p className="text-sm text-gray-600">Share your exact location</p>
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
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={onExit}
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

  if (isPlaying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
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
                  onClick={onExit}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          <div className="w-32 h-32 berry-gradient rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-white font-bold text-4xl">B</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">BerryTrip Demo</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take an interactive tour of our platform and discover how BerryTrip makes 
            solo female travel safe, social, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="flex items-center justify-center px-8 py-4 berry-gradient text-white rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              <Play className="w-6 h-6 mr-2" />
              Start Interactive Tour
            </button>
            <button
              onClick={onExit}
              className="px-8 py-4 border-2 border-berry-600 text-berry-600 rounded-xl text-lg font-semibold hover:bg-berry-50 transition-colors"
            >
              Skip to App
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
