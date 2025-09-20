// src/api/axios.ts
import axios from 'axios'
import toast from 'react-hot-toast'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

const api = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' } })

// attach token if present in localStorage
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('access_token')
  if (token) cfg.headers = { ...cfg.headers, Authorization: `Bearer ${token}` }
  return cfg
})

// global error handling
api.interceptors.response.use(
  r => r,
  err => {
    const msg = err?.response?.data?.message || err?.message || 'An error occurred'
    // If it's validation errors array, join
    if (Array.isArray(err?.response?.data?.message)) {
      toast.error(err.response.data.message.join('; '))
    } else {
      toast.error(msg)
    }
    return Promise.reject(err)
  }
)

export default api
