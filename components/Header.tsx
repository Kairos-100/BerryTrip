'use client'

import { useState } from 'react'
import { MapPin, MessageCircle, Calendar, Shield, Menu, X, User } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'

interface HeaderProps {
  onLoginClick: () => void
  user: any
  onLogout: () => void
}

export default function Header({ onLoginClick, user, onLogout }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navigation = [
    { name: t('header.nav.map'), href: '#mapa', icon: MapPin },
    { name: t('header.nav.bookings'), href: '#reservas', icon: Calendar },
    { name: t('header.nav.chat'), href: '#chat', icon: MessageCircle },
    { name: t('header.nav.emergency'), href: '#emergencia', icon: Shield },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 berry-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <span className="ml-2 text-2xl font-bold text-berry-600">
                {t('header.logo')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-berry-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.name}
                </a>
              )
            })}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-berry-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-berry-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  {t('header.logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="berry-gradient text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {t('header.login')}
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-berry-600"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-berry-600 px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
