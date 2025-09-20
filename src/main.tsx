// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './utils/auth'
import PrivateRoute from './components/PrivateRoute'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnimatePresence mode="wait">
  <div>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        style: { borderRadius: 8, padding: '8px 12px' },
      }}
    />
  </div>
</AnimatePresence>
    </BrowserRouter>
  </React.StrictMode>
)
