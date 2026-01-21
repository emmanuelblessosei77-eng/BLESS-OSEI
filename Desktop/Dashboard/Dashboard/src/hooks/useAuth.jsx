
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  signupUser,
} from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      signup: async (data) => {
        setLoading(true)
        try {
          const newUser = await signupUser(data)
          setUser(newUser)
          return { success: true, user: newUser }
        } catch (error) {
          return { success: false, message: error.message }
        } finally {
          setLoading(false)
        }
      },
      login: async (credentials) => {
        setLoading(true)
        try {
          const loggedIn = await loginUser(credentials)
          setUser(loggedIn)
          return { success: true, user: loggedIn }
        } catch (error) {
          return { success: false, message: error.message }
        } finally {
          setLoading(false)
        }
      },
      logout: () => {
        logoutUser()
        setUser(null)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}

