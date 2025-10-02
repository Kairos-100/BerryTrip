import { useState } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import BookingSection from '@/components/BookingSection'
import ChatSection from '@/components/ChatSection'
import EmergencyButton from '@/components/EmergencyButton'
import AuthModal from '@/components/AuthModal'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
      />
      
      <Hero 
        onGetStarted={() => setIsAuthModalOpen(true)}
        onViewDemo={() => setIsDemoMode(true)}
      />
      
      {isDemoMode ? (
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <div className="w-8 h-8 berry-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <span className="ml-2 text-2xl font-bold text-berry-600">BerryTrip</span>
                </div>
                <button
                  onClick={() => setIsDemoMode(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Exit Demo
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Demo Mode - BerryTrip</h1>
              <p className="text-lg text-gray-600 mb-8">
                This is a demo version showing the interface without real functionality. 
                In the full version, you would be able to book accommodations, chat with other travelers, 
                and use all safety features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Safety Map</h3>
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Interactive Map Would Appear Here</span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Accommodations</h3>
                  <div className="space-y-3">
                    <div className="h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Hotel Cards</span>
                    </div>
                    <div className="h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Booking Interface</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Global Chat</h3>
                  <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Chat Interface Would Appear Here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <MapSection user={user} />
          <BookingSection user={user} />
          <ChatSection user={user} />
          <EmergencyButton />
        </>
      )}
      
      {isAuthModalOpen && (
        <AuthModal 
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={(userData) => {
            setUser(userData)
            setIsAuthModalOpen(false)
          }}
        />
      )}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}


