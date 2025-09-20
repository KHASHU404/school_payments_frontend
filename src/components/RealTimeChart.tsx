import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import api from '../api/axios'
import dayjs from 'dayjs'

export default function RealTimeChart({ pollInterval = 5000 }: { pollInterval?: number }){
  const [data, setData] = useState<any[]>([])

  const fetch = async () => {
    try {
      const r = await api.get('/transactions', { params: { page:1, limit:100 } })
      const items = r.data.data || []
      // aggregate count by date (YYYY-MM-DD)
      const map: Record<string, number> = {}
      items.forEach((it:any) => {
        const t = it.payment_time ? dayjs(it.payment_time).format('YYYY-MM-DD') : dayjs(it.createdAt).format('YYYY-MM-DD')
        map[t] = (map[t]||0)+1
      })
      const series = Object.keys(map).sort().map(k=> ({ date: k, count: map[k] }))
      setData(series)
    } catch (err) { console.error(err) }
  }

  useEffect(()=>{ fetch(); const id = setInterval(fetch, pollInterval); return ()=> clearInterval(id) }, [pollInterval])

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h4 className="text-sm font-semibold mb-2">Transactions (real-time)</h4>
      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#2b9bfa" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
