'use client'

import { useState } from 'react'
import { X, Mail, Lock, User, Shield, Eye, EyeOff, FileText, Camera, CheckCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface AuthModalProps {
  onClose: () => void
  onSuccess: (user: any) => void
}

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
  documentType: string
  documentNumber: string
  country: string
  adminCode?: string
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verificationStep, setVerificationStep] = useState<'form' | 'verification' | 'success'>('form')
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm<FormData>()

  const password = watch('password')
  const documentType = watch('documentType')
  const adminCode = watch('adminCode')

  // Códigos de administrador (solo para ti)
  const adminCodes = ['BERRY2024', 'ADMIN123', 'VERIFYME']

  const countries = [
    { code: 'ES', name: 'España' },
    { code: 'FR', name: 'Francia' },
    { code: 'IT', name: 'Italia' },
    { code: 'DE', name: 'Alemania' },
    { code: 'US', name: 'Estados Unidos' },
    { code: 'MX', name: 'México' },
    { code: 'AR', name: 'Argentina' },
    { code: 'CO', name: 'Colombia' },
    { code: 'BR', name: 'Brasil' },
    { code: 'CL', name: 'Chile' },
    { code: 'PE', name: 'Perú' },
    { code: 'EC', name: 'Ecuador' },
    { code: 'VE', name: 'Venezuela' },
    { code: 'UY', name: 'Uruguay' },
    { code: 'PY', name: 'Paraguay' },
    { code: 'BO', name: 'Bolivia' },
    { code: 'CR', name: 'Costa Rica' },
    { code: 'PA', name: 'Panamá' },
    { code: 'GT', name: 'Guatemala' },
    { code: 'HN', name: 'Honduras' },
    { code: 'SV', name: 'El Salvador' },
    { code: 'NI', name: 'Nicaragua' },
    { code: 'DO', name: 'República Dominicana' },
    { code: 'CU', name: 'Cuba' },
    { code: 'JM', name: 'Jamaica' },
    { code: 'TT', name: 'Trinidad y Tobago' },
    { code: 'CA', name: 'Canadá' },
    { code: 'AU', name: 'Australia' },
    { code: 'NZ', name: 'Nueva Zelanda' },
    { code: 'JP', name: 'Japón' },
    { code: 'CN', name: 'China' },
    { code: 'IN', name: 'India' },
    { code: 'TH', name: 'Tailandia' },
    { code: 'SG', name: 'Singapur' },
    { code: 'MY', name: 'Malasia' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'PH', name: 'Filipinas' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'KR', name: 'Corea del Sur' },
    { code: 'RU', name: 'Rusia' },
    { code: 'TR', name: 'Turquía' },
    { code: 'EG', name: 'Egipto' },
    { code: 'ZA', name: 'Sudáfrica' },
    { code: 'NG', name: 'Nigeria' },
    { code: 'KE', name: 'Kenia' },
    { code: 'MA', name: 'Marruecos' },
    { code: 'TN', name: 'Túnez' },
    { code: 'DZ', name: 'Argelia' },
    { code: 'LY', name: 'Libia' },
    { code: 'ET', name: 'Etiopía' },
    { code: 'GH', name: 'Ghana' },
    { code: 'SN', name: 'Senegal' },
    { code: 'CI', name: 'Costa de Marfil' },
    { code: 'CM', name: 'Camerún' },
    { code: 'UG', name: 'Uganda' },
    { code: 'TZ', name: 'Tanzania' },
    { code: 'ZW', name: 'Zimbabue' },
    { code: 'BW', name: 'Botsuana' },
    { code: 'NA', name: 'Namibia' },
    { code: 'ZM', name: 'Zambia' },
    { code: 'MW', name: 'Malawi' },
    { code: 'MZ', name: 'Mozambique' },
    { code: 'MG', name: 'Madagascar' },
    { code: 'MU', name: 'Mauricio' },
    { code: 'SC', name: 'Seychelles' },
    { code: 'RE', name: 'Reunión' },
    { code: 'YT', name: 'Mayotte' },
    { code: 'KM', name: 'Comoras' },
    { code: 'DJ', name: 'Yibuti' },
    { code: 'SO', name: 'Somalia' },
    { code: 'ER', name: 'Eritrea' },
    { code: 'SD', name: 'Sudán' },
    { code: 'SS', name: 'Sudán del Sur' },
    { code: 'TD', name: 'Chad' },
    { code: 'CF', name: 'República Centroafricana' },
    { code: 'CD', name: 'República Democrática del Congo' },
    { code: 'CG', name: 'República del Congo' },
    { code: 'GA', name: 'Gabón' },
    { code: 'GQ', name: 'Guinea Ecuatorial' },
    { code: 'ST', name: 'Santo Tomé y Príncipe' },
    { code: 'AO', name: 'Angola' },
    { code: 'CV', name: 'Cabo Verde' },
    { code: 'GW', name: 'Guinea-Bisáu' },
    { code: 'GN', name: 'Guinea' },
    { code: 'SL', name: 'Sierra Leona' },
    { code: 'LR', name: 'Liberia' },
    { code: 'BF', name: 'Burkina Faso' },
    { code: 'ML', name: 'Malí' },
    { code: 'NE', name: 'Níger' },
    { code: 'BJ', name: 'Benín' },
    { code: 'TG', name: 'Togo' },
    { code: 'RW', name: 'Ruanda' },
    { code: 'BI', name: 'Burundi' }
  ]

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    // Verificar si es código de administrador
    if (data.adminCode && adminCodes.includes(data.adminCode)) {
      setIsAdminMode(true)
      setVerificationStatus('approved')
      setVerificationStep('success')
    } else {
      // Simular verificación de identidad
      setVerificationStep('verification')
      
      // Simular proceso de verificación (2-3 segundos)
      setTimeout(() => {
        // Simular verificación exitosa (en producción sería real)
        setVerificationStatus('approved')
        setVerificationStep('success')
      }, 2500)
    }
    
    setIsLoading(false)
  }

  const handleVerificationComplete = () => {
    const user = {
      id: 1,
      name: watch('name') || 'Usuario',
      email: watch('email'),
      avatar: null,
      verified: true,
      isAdmin: isAdminMode,
      documentType: watch('documentType'),
      country: watch('country')
    }
    
    onSuccess(user)
    reset()
    setVerificationStep('form')
    setIsAdminMode(false)
    setVerificationStatus('pending')
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    reset()
    setVerificationStep('form')
    setIsAdminMode(false)
    setVerificationStatus('pending')
  }

  const handleAdminCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValue('adminCode', value)
    
    if (adminCodes.includes(value)) {
      setIsAdminMode(true)
    } else {
      setIsAdminMode(false)
    }
  }

  if (verificationStep === 'verification') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Verificando Identidad
          </h2>
          
          <p className="text-gray-600 mb-6">
            Estamos verificando tu documento de identidad para confirmar que eres una mujer. 
            Este proceso puede tomar unos minutos.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Verificando documento...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Validando información...</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="text-sm text-gray-600">Confirmando identidad...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (verificationStep === 'success') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Verificación Exitosa!
          </h2>
          
          <p className="text-gray-600 mb-6">
            {isAdminMode 
              ? 'Código de administrador verificado. Acceso completo concedido.'
              : 'Tu identidad ha sido verificada exitosamente. Bienvenida a BerryTrip.'
            }
          </p>
          
          <button
            onClick={handleVerificationComplete}
            className="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Continuar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 berry-gradient rounded-full flex items-center justify-center mr-3">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
                </h2>
                <p className="text-sm text-gray-600">
                  {isLogin ? 'Bienvenida de vuelta' : 'Únete a la comunidad'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Código de Administrador */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Código de Administrador
                </h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Si tienes un código de administrador, ingrésalo para acceso completo.
                </p>
                <input
                  type="text"
                  {...register('adminCode')}
                  onChange={handleAdminCodeChange}
                  className="w-full px-3 py-2 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                  placeholder="Código de administrador (opcional)"
                  style={{ color: '#1f2937', fontSize: '16px' }}
                />
                {isAdminMode && (
                  <div className="flex items-center mt-2 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Modo administrador activado</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  {...register('name', { 
                    required: !isLogin ? 'El nombre es requerido' : false,
                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                  })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent text-gray-900"
                  placeholder="Tu nombre completo"
                  style={{ color: '#1f2937', fontSize: '16px' }}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo electrónico
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                {...register('email', { 
                  required: 'El email es requerido',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email inválido'
                  }
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent text-gray-900"
                placeholder="tu@email.com"
                style={{ color: '#1f2937', fontSize: '16px' }}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { 
                  required: 'La contraseña es requerida',
                  minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent text-gray-900"
                placeholder="Tu contraseña"
                style={{ color: '#1f2937', fontSize: '16px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', { 
                    required: !isLogin ? 'Confirma tu contraseña' : false,
                    validate: value => value === password || 'Las contraseñas no coinciden'
                  })}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent text-gray-900"
                  placeholder="Confirma tu contraseña"
                  style={{ color: '#1f2937', fontSize: '16px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          {/* Verificación de Identidad - Solo para registro */}
          {!isLogin && !isAdminMode && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Verificación de Identidad Requerida
                    </h4>
                    <p className="text-sm text-blue-700">
                      BerryTrip es exclusivo para mujeres. Necesitamos verificar tu identidad 
                      para garantizar la seguridad de nuestra comunidad.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de documento
                </label>
                <select
                  {...register('documentType', { required: 'Selecciona un tipo de documento' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                >
                  <option value="">Selecciona un documento</option>
                  <option value="dni">DNI / Cédula de Identidad</option>
                  <option value="passport">Pasaporte</option>
                  <option value="license">Licencia de Conducir</option>
                </select>
                {errors.documentType && (
                  <p className="mt-1 text-sm text-red-600">{errors.documentType.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de documento
                </label>
                <input
                  type="text"
                  {...register('documentNumber', { 
                    required: 'El número de documento es requerido',
                    minLength: { value: 5, message: 'Mínimo 5 caracteres' }
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent text-gray-900"
                  placeholder="Número de tu documento"
                  style={{ color: '#1f2937', fontSize: '16px' }}
                />
                {errors.documentNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.documentNumber.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País de emisión
                </label>
                <select
                  {...register('country', { required: 'Selecciona tu país' })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                >
                  <option value="">Selecciona tu país</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <Camera className="w-5 h-5 text-gray-600 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Subir Foto del Documento
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Necesitamos una foto clara de tu documento de identidad para verificar tu identidad.
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berry-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Formatos aceptados: JPG, PNG, PDF. Máximo 5MB.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isLogin && (
            <div className="flex items-start">
              <input
                type="checkbox"
                {...register('acceptTerms', { 
                  required: 'Debes aceptar los términos y condiciones'
                })}
                className="mt-1 h-4 w-4 text-berry-600 focus:ring-berry-500 border-gray-300 rounded"
              />
              <label className="ml-3 text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-berry-600 hover:text-berry-500 font-medium">
                  términos y condiciones
                </a>{' '}
                y la{' '}
                <a href="#" className="text-berry-600 hover:text-berry-500 font-medium">
                  política de privacidad
                </a>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full berry-gradient text-white py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Iniciando sesión...' : 'Verificando identidad...'}
              </>
            ) : (
              isLogin ? 'Iniciar Sesión' : 'Verificar Identidad'
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-berry-600 hover:text-berry-500 font-medium"
            >
              {isLogin 
                ? '¿No tienes cuenta? Regístrate' 
                : '¿Ya tienes cuenta? Inicia sesión'
              }
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-center text-sm text-gray-600">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            <span>Tu información está protegida y encriptada</span>
          </div>
        </div>
      </div>
    </div>
  )
}