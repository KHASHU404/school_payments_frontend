// src/pages/SchoolTransactionsPage.tsx
import React, { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import TransactionsPage from './TransactionsPage'

export default function SchoolTransactionsPage(){
  const { schoolId } = useParams()
  const [, setParams] = useSearchParams()

  useEffect(() => {
    if (schoolId) {
      const s = new URLSearchParams(window.location.search)
      s.set('school', schoolId)
      s.set('page', '1')
      setParams(s)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schoolId])

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-100 to-indigo-50 inline-block px-3 py-1 rounded-lg">
  Transactions for <span className="font-bold text-indigo-700">{schoolId}</span>
</h2>

      <TransactionsPage />
    </div>
  )
}
