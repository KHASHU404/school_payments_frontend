// src/pages/LoginPage.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../schemas/auth'
import { z } from 'zod'
import Input from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../utils/auth'

type Form = z.infer<typeof loginSchema>

export default function LoginPage(){
  const nav = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(loginSchema) })
  const { login } = useAuth()
  const onSubmit = async (values: Form) => {
  try {
    const r = await api.post('/auth/login', values)
    console.log('login response', r.data)               // <--- inspect in console
    const token = r.data?.access_token ?? r.data?.token // handle variants
    if (!token) {
      toast.error('Login succeeded but no token returned')
      return
    }

    localStorage.setItem('access_token', token)
    // ensure axios interceptor will pick it up on next requests (it reads localStorage)
    toast.success('Welcome back!')

    // Two safe redirect options: use navigate OR hard reload if PrivateRoute is flaky
    // Preferred: navigate
    login(token)
    nav('/', { replace: true })

    // If your PrivateRoute still immediately redirects you back, uncomment the reload:
    // window.location.href = '/'
  } catch (err:any) {
    toast.error(err?.response?.data?.message || 'Login failed')
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-brand-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-brand-500 flex items-center justify-center text-white font-bold text-lg">SP</div>
          <div>
            <h1 className="text-xl font-semibold">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Username"
            {...register('username')}
            placeholder="your.username"
            autoComplete="username"
            error={errors.username?.message as string}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message as string}
            helper="Use a strong password. For demo use 'testpass'."
          />

          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
            <Link to="/auth/register" className="text-sm text-gray-500 hover:underline">Create account</Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
