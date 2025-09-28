'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import MapSection from '@/components/MapSection'
import BookingSection from '@/components/BookingSection'
import ChatSection from '@/components/ChatSection'
import EmergencyButton from '@/components/EmergencyButton'
import AuthModal from '@/components/AuthModal'

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-berry-50 to-safety-50">
      <Header 
        onLoginClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => setUser(null)}
      />
      
      <Hero onGetStarted={() => setIsAuthModalOpen(true)} />
      
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
