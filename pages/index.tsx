import { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import BookingSection from '@/components/BookingSection'
import ChatSection from '@/components/ChatSection'
import EmergencyButton from '@/components/EmergencyButton'
import AuthModal from '@/components/AuthModal'

export default function Home() {
  const router = useRouter()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false)

  useEffect(() => {
    // Check for signup success parameter
    if (router.query.signup === 'success') {
      setShowWelcomeMessage(true)
      // Remove the query parameter from URL
      router.replace('/', undefined, { shallow: true })
      // Hide message after 5 seconds
      setTimeout(() => setShowWelcomeMessage(false), 5000)
    }
  }, [router])

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      
      {/* Welcome Message */}
      {showWelcomeMessage && (
        <div className="fixed top-4 left-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <span>🎉 Welcome to BerryTrip! Your account has been created successfully.</span>
          <button
            onClick={() => setShowWelcomeMessage(false)}
            className="text-white hover:text-gray-200 ml-2"
          >
            ✕
          </button>
        </div>
      )}

      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
      />
      
      <Hero 
        onGetStarted={() => setIsAuthModalOpen(true)}
      />
      
      <MapSection user={user} />
      <BookingSection user={user} />
      <ChatSection user={user} />
      <EmergencyButton />
      
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


