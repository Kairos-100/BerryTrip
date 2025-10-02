import React from 'react'

interface DeviceInfoProps {
  deviceInfo: {
    isMobile: boolean
    isTablet: boolean
    deviceType: 'mobile' | 'tablet' | 'desktop'
    screenWidth: number
  }
}

export default function DeviceInfo({ deviceInfo }: DeviceInfoProps) {
  const { isMobile, isTablet, deviceType, screenWidth } = deviceInfo

  const getDeviceIcon = () => {
    if (isMobile) return '📱'
    if (isTablet) return '📱'
    return '💻'
  }

  const getDeviceText = () => {
    if (isMobile) return 'Móvil'
    if (isTablet) return 'Tablet'
    return 'Escritorio'
  }

  const getDeviceColor = () => {
    if (isMobile) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (isTablet) return 'bg-purple-100 text-purple-800 border-purple-200'
    return 'bg-green-100 text-green-800 border-green-200'
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`px-3 py-2 rounded-lg border-2 ${getDeviceColor()} shadow-lg`}>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getDeviceIcon()}</span>
          <div>
            <div className="font-semibold text-sm">{getDeviceText()}</div>
            <div className="text-xs opacity-75">{screenWidth}px</div>
          </div>
        </div>
      </div>
    </div>
  )
}
