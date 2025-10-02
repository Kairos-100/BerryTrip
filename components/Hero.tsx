'use client'

import { MapPin, Shield, Users, Star } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

interface HeroProps {
  onGetStarted: () => void
}

export default function Hero({ onGetStarted }: HeroProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const handleViewDemo = () => {
    router.push('/demo')
  }
  
  const features = [
    {
      icon: MapPin,
      title: t('hero.features.map.title'),
      description: t('hero.features.map.description')
    },
    {
      icon: Shield,
      title: t('hero.features.accommodations.title'),
      description: t('hero.features.accommodations.description')
    },
    {
      icon: Users,
      title: t('hero.features.community.title'),
      description: t('hero.features.community.description')
    },
    {
      icon: Star,
      title: t('hero.features.emergency.title'),
      description: t('hero.features.emergency.description')
    }
  ]

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('hero.title')} <span className="text-berry-600">{t('hero.brandName')}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={onGetStarted}
              className="berry-gradient text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              {t('hero.getStarted')}
            </button>
            <button 
              onClick={handleViewDemo}
              className="border-2 border-berry-600 text-berry-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-berry-50 transition-colors"
            >
              {t('hero.viewDemo')}
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 berry-gradient rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-berry-200 rounded-full opacity-20"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-safety-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-berry-300 rounded-full opacity-20"></div>
      </div>
    </section>
  )
}
