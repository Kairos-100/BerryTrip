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
import DemoPresentation from '@/components/DemoPresentation'

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
        <DemoPresentation onExit={() => setIsDemoMode(false)} />
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


