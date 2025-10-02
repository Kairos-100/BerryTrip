import { useState, useEffect, createContext, useContext } from 'react'
import { useRouter } from 'next/router'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  location: string
  interests: string[]
  verified: boolean
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (userData: RegisterData) => Promise<boolean>
  logout: () => void
  verifyToken: () => Promise<boolean>
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  location: string
  interests: string[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('berrytrip_token')
    const storedUser = localStorage.getItem('berrytrip_user')

    if (storedToken && storedUser) {
      setToken(storedToken)
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('berrytrip_token')
        localStorage.removeItem('berrytrip_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (response.ok) {
        setUser(result.user)
        setToken(result.token)
        localStorage.setItem('berrytrip_token', result.token)
        localStorage.setItem('berrytrip_user', JSON.stringify(result.user))
        return true
      } else {
        console.error('Login error:', result.error)
        return false
      }
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      const result = await response.json()

      if (response.ok) {
        setUser(result.user)
        setToken(result.token)
        localStorage.setItem('berrytrip_token', result.token)
        localStorage.setItem('berrytrip_user', JSON.stringify(result.user))
        return true
      } else {
        console.error('Registration error:', result.error)
        return false
      }
    } catch (error) {
      console.error('Registration error:', error)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('berrytrip_token')
    localStorage.removeItem('berrytrip_user')
    router.push('/')
  }

  const verifyToken = async (): Promise<boolean> => {
    if (!token) return false

    try {
      const response = await fetch('/api/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const result = await response.json()

      if (response.ok) {
        setUser(result.user)
        localStorage.setItem('berrytrip_user', JSON.stringify(result.user))
        return true
      } else {
        // Token is invalid, logout user
        logout()
        return false
      }
    } catch (error) {
      console.error('Token verification error:', error)
      logout()
      return false
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    verifyToken,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
