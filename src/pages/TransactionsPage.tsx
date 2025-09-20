// src/pages/TransactionsPage.tsx
import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import TransactionsTable from '../components/TransactionsTable'
import Pagination from '../components/Pagination'
import Filters from '../components/Filters'
import { useSearchParams } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import RealTimeChart from '../components/RealTimeChart'
import TransactionDetailModal from '../components/TransactionDetailModal'

export default function TransactionsPage(){
  const [params, setParams] = useSearchParams()
  const [data, setData] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(Number(params.get('page') || 1))
  const [limit] = useState(Number(params.get('limit') || 10))
  const [sort, setSort] = useState(params.get('sort') || 'payment_time')
  const [order, setOrder] = useState<'asc'|'desc'>((params.get('order') as any) || 'desc')
  const [statusFilter, setStatusFilter] = useState<string[]>(params.getAll('status') || [])
  const [schoolFilter, setSchoolFilter] = useState<string | null>(params.get('school') || null)
  const [dateFrom, setDateFrom] = useState<string|null>(params.get('from') || null)
  const [dateTo, setDateTo] = useState<string|null>(params.get('to') || null)
  const debouncedStatus = useDebounce(statusFilter, 250)
  const [selected, setSelected] = useState<any>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // search state
  const [search, setSearch] = useState(params.get('search') || '')
  const debouncedSearch = useDebounce(search, 300)

  const fetch = async () => {
    const q: any = { page, limit }
    if (debouncedStatus?.length) q.status = debouncedStatus.join(',')
    if (schoolFilter) q.schoolId = schoolFilter
    if (sort) q.sort = sort
    if (order) q.order = order
    if (dateFrom) q.from = dateFrom
    if (dateTo) q.to = dateTo
    if (debouncedSearch && debouncedSearch.trim()) q.search = debouncedSearch.trim()

    try {
      const r = await api.get('/transactions', { params: q })
      setData(r.data.data || [])
      setTotal(r.data.total || 0)
    } catch (err:any) {
      console.error('Transactions fetch error', err)
      setData([])
      setTotal(0)
    }
  }

  useEffect(()=>{ fetch() }, [page, limit, debouncedStatus, schoolFilter, sort, order, dateFrom, dateTo, debouncedSearch])

  useEffect(()=>{ // persist filters into URL
    const s = new URLSearchParams()
    s.set('page', String(page))
    s.set('limit', String(limit))
    s.set('sort', sort)
    s.set('order', order)
    if (schoolFilter) s.set('school', schoolFilter)
    debouncedStatus.forEach(st => s.append('status', st))
    if (dateFrom) s.set('from', dateFrom)
    if (dateTo) s.set('to', dateTo)
    if (search) s.set('search', search)
    setParams(s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, sort, order, debouncedStatus, schoolFilter, dateFrom, dateTo, search])

  const onSort = (field:string) => { if (sort===field) setOrder(order==='asc'?'desc':'asc'); else { setSort(field); setOrder('desc') } }
  const onRowClick = (row:any) => { setSelected(row); setModalOpen(true) }

  // local client-side fallback filtering (only used if backend returns whole page)
  // we still prefer server-side filtering via `q.search`, but this is safe guard.
  const filtered = debouncedSearch
    ? data.filter((tx) => {
        const searchTerm = debouncedSearch.toLowerCase()
        return (
          String(tx.collect_id ?? '').toLowerCase().includes(searchTerm) ||
          String(tx.custom_order_id ?? '').toLowerCase().includes(searchTerm) ||
          String(tx.student_info?.name ?? '').toLowerCase().includes(searchTerm)
        )
      })
    : data

  const statuses = ['success','pending','failed']
  const schools = ['65b0e6293e9f76a9694d84b4'] // optionally fetch schools from backend /schools

  return (
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-8">

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <div className="w-96"><RealTimeChart pollInterval={7000} /></div>
      </div>

      <div className="flex items-start gap-4">
        <aside className="w-72 card-glass">

        <Filters
          statuses={statuses}
          schools={schools}
          selectedStatuses={statusFilter}
          setSelectedStatuses={setStatusFilter}
          selectedSchool={schoolFilter}
          setSelectedSchool={setSchoolFilter}
          onDateRange={(f:any,t:any)=>{ if (f) setDateFrom(f); if (t) setDateTo(t) }}
          />
          </aside>
        <div className="ml-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collect_id / custom_order_id / student"
            className="border rounded px-2 py-1 text-sm w-64 bg-white dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex-1 card-glass overflow-hidden">
      <TransactionsTable data={filtered} onSort={onSort} sortField={sort} sortOrder={order} onRowClick={onRowClick} />
      </div>
      <div className="flex items-center justify-between">
        <Pagination page={page} total={total} limit={limit} onPage={(p)=> setPage(p)} />
        <div className="text-sm text-gray-500">Showing {filtered.length} of {total}</div>
      </div>

      <TransactionDetailModal open={modalOpen} onClose={()=>setModalOpen(false)} item={selected} />
    </div>
  )
}
