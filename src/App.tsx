import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import TransactionsPage from './pages/TransactionsPage'
import SchoolTransactionsPage from './pages/SchoolTransactionsPage'
import StatusCheckPage from './pages/StatusCheckPage'
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import { AuthProvider, useAuth } from './utils/auth'
import CreatePaymentPage from './pages/CreatePaymentPage'
import { Link } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import PrivateRoute from './components/PrivateRoute'
import DashboardPage from './pages/DashboardPage'


export default function App(){
  return (
    <AuthProvider>
      <Link to="/create-payment">Create Payment</Link> somewhere in Header nav
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="p-6 max-w-7xl mx-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/auth/register" element={<RegisterPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} />
            <Route path="/school/:schoolId" element={<PrivateRoute><SchoolTransactionsPage /></PrivateRoute>} />
            <Route path="/status-check" element={<PrivateRoute><StatusCheckPage /></PrivateRoute>} />
            <Route path="/create-payment" element={<PrivateRoute><CreatePaymentPage /></PrivateRoute>} />
<Route path="/school/:schoolId" element={<PrivateRoute><SchoolTransactionsPage /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}
