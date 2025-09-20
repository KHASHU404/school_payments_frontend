// src/pages/RegisterPage.tsx
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../schemas/auth'
import { z } from 'zod'
import Input from '../components/ui/Input'
import {Button} from '../components/ui/Button'
import api from '../api/axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

type Form = z.infer<typeof registerSchema>

export default function RegisterPage(){
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: Form) => {
    try {
      await api.post('/auth/register', { username: values.username, password: values.password })
      toast.success('Account created — logging you in')
      const login = await api.post('/auth/login', { username: values.username, password: values.password })
      localStorage.setItem('access_token', login.data.access_token)
      navigate('/')
    } catch (err:any) {
      toast.error(err?.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-brand-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-4">Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Username" {...register('username')} autoComplete="username" error={errors.username?.message as string} />
          <Input type="password" label="Password" {...register('password')} autoComplete="new-password" error={errors.password?.message as string} helper="At least 6 characters" />
          <Input type="password" label="Confirm password" {...register('confirmPassword')} autoComplete="new-password" error={errors.confirmPassword?.message as string} />
          <div className="flex items-center justify-between">
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Create account'}</Button>
            <button type="button" onClick={()=>navigate('/auth/login')} className="text-sm text-gray-500">Already have an account?</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
