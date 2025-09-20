// src/components/PrivateRoute.tsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'

export default function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}
