import { useState, useEffect } from 'react'

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const screenWidth = window.innerWidth

      // Detectar móviles por User Agent
      const mobilePatterns = [
        /android/i,
        /iphone/i,
        /ipod/i,
        /blackberry/i,
        /windows phone/i,
        /mobile/i,
        /webos/i,
        /opera mini/i,
        /iemobile/i
      ]

      const isMobileUA = mobilePatterns.some(pattern => pattern.test(userAgent))
      
      // Detectar por tamaño de pantalla
      const isMobileScreen = screenWidth <= 768
      const isTabletScreen = screenWidth > 768 && screenWidth <= 1024

      // Combinar detección por User Agent y tamaño de pantalla
      const finalIsMobile = isMobileUA || isMobileScreen
      const finalIsTablet = !isMobileUA && isTabletScreen

      setIsMobile(finalIsMobile)
      setIsTablet(finalIsTablet)
      
      if (finalIsMobile) {
        setDeviceType('mobile')
      } else if (finalIsTablet) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    // Verificar al cargar
    checkDevice()

    // Verificar al redimensionar la ventana
    window.addEventListener('resize', checkDevice)

    return () => {
      window.removeEventListener('resize', checkDevice)
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    deviceType,
    screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0
  }
}
