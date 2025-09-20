// src/utils/auth.tsx  (or wherever your AuthProvider lives)
import React, { createContext, useContext, useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode' // optional, only if you want user info

type AuthContextShape = {
  token: string | null
  login: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextShape | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('access_token'))

  // keep state in sync if another tab changes localStorage
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'access_token') setToken(e.newValue)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const login = (t: string) => {
    localStorage.setItem('access_token', t)
    setToken(t)
  }
  const logout = () => {
    localStorage.removeItem('access_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
