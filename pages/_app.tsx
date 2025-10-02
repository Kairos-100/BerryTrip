import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useMobileDetection } from '../hooks/useMobileDetection'
import './globals.css'

function App({ Component, pageProps }: AppProps) {
  const { isMobile, isTablet, deviceType, screenWidth } = useMobileDetection()

  // Agregar información del dispositivo a las props
  const enhancedPageProps = {
    ...pageProps,
    deviceInfo: {
      isMobile,
      isTablet,
      deviceType,
      screenWidth
    }
  }

  return <Component {...enhancedPageProps} />
}

export default appWithTranslation(App)
