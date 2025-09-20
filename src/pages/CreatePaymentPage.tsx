// src/pages/CreatePaymentPage.tsx
import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'
import toast from 'react-hot-toast'

function parseJwt(token: string | null) {
  if (!token) return {}
  try {
    const b = token.split('.')[1]
    return JSON.parse(decodeURIComponent(escape(window.atob(b))))
  } catch (e) {
    return {}
  }
}

export default function CreatePaymentPage(){
  const { token } = useAuth()
  const nav = useNavigate()

  // default school from env or known id
  const defaultSchool = import.meta.env.VITE_DEFAULT_SCHOOL || '65b0e6293e9f76a9694d84b4'
  const [schoolId, setSchoolId] = useState(defaultSchool)
  const [amount, setAmount] = useState('100')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string|null>(null)

  // derive student info from JWT if possible
  const jwtPayload: any = parseJwt(token)
  const defaultStudentName = jwtPayload?.username ?? jwtPayload?.name ?? 'Student'
  const defaultStudentId = jwtPayload?.sub ?? `anon-${Date.now()}`

  useEffect(()=> {
    // Optionally fetch list of schools from backend and set select options
    // (left for you to implement if you have /schools endpoint)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)

    try {
      const payload = {
        school_id: schoolId,
        amount: String(amount),
        student_info: {
          name: defaultStudentName,
          id: String(defaultStudentId),
          email: jwtPayload?.email ?? undefined
        },
        // generate custom id for mapping
        custom_order_id: `ORD-${Date.now()}`
      }

      const r = await api.post('/create-payment', payload) // ensure token interceptor sends Authorization header
      console.log('create-payment response', r.data)

      // normalized key returned by backend (see backend fix notes below)
      const url = r.data?.collect_request_url
        || r.data?.provider?.Collect_request_url
        || r.data?.provider?.collect_request_url
        || r.data?.provider?.redirect_url
        || r.data?.provider_raw?.Collect_request_url
        || r.data?.provider_raw?.collect_request_url
        || r.data?.provider_raw?.redirect_url

      if (url) {
        toast.success('Redirecting to payment page...')
        window.location.href = url
        return
      }

      // helpful debugging message for dev
      setError('No payment URL returned. Server response: ' + JSON.stringify(r.data))
      toast.error('Payment URL missing — check server logs (dev only).')
    } catch (err:any) {
      console.error(err)
      setError(err?.response?.data?.message || err?.message || 'Create payment failed')
      toast.error('Create payment failed: ' + (err?.response?.data?.message ?? err?.message ?? 'Unknown'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Create Payment</h3>

      <form onSubmit={submit} className="space-y-4">
        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">School ID</label>
        <input className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
               value={schoolId}
               onChange={e => setSchoolId(e.target.value)} />

        <label className="block text-xs font-medium text-gray-600 dark:text-gray-300">Amount (INR)</label>
        <input type="number" min="1" step="1"
               className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700"
               value={amount}
               onChange={e => setAmount(e.target.value)} />

        <div className="text-sm text-gray-500">
          Student: <strong>{defaultStudentName}</strong> (id: {defaultStudentId})
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex gap-2">
          <button type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-brand-600 text-white rounded disabled:opacity-60">
            {loading ? 'Creating...' : 'Create & Pay'}
          </button>
          <button type="button" onClick={() => nav('/')} className="px-4 py-2 border rounded">Cancel</button>
        </div>
      </form>
    </div>
  )
}
