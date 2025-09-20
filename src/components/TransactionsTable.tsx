import React from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

export default function TransactionsTable({ data, onSort, sortField, sortOrder, onRowClick }: any){
  const header = (key:string, label:string) => (
    <th className="px-4 py-3 text-left cursor-pointer select-none" onClick={()=>onSort(key)}>
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {sortField===key && <span className="text-xs">{sortOrder==='asc'?'↑':'↓'}</span>}
      </div>
    </th>
  )
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50 dark:bg-gray-900">
          <tr>
            {header('collect_id','Collect ID')}
            {header('school_id','School ID')}
            {header('gateway','Gateway')}
            {header('order_amount','Order Amount')}
            {header('transaction_amount','Txn Amount')}
            {header('status','Status')}
            {header('custom_order_id','Custom Order')}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row:any)=> (
            <tr key={row._id} className={clsx('table-row-hover', 'hover:bg-gray-50 dark:hover:bg-gray-900', row.status==='success'?'bg-green-50 dark:bg-green-900/20':'')}>
              <td className="px-4 py-3">{row.collect_id}</td>
              <td className="px-4 py-3">{row.school_id}</td>
              <td className="px-4 py-3">{row.gateway}</td>
              <td className="px-4 py-3">{row.order_amount}</td>
              <td className="px-4 py-3">{row.transaction_amount}</td>
              <td className="px-4 py-3">{row.status}</td>
              <td className="px-4 py-3">{row.custom_order_id}</td>
              <td className="px-4 py-3 text-sm"><button onClick={() => onRowClick(row)} className="px-2 py-1 border rounded text-xs">Details</button></td>
              <td className="px-4 py-2">
  <Link
    to={`/schools/${row.school_id??'unknown student id , maybe in developer phase'}/transactions`}
    className="inline-block btn-accent"
  >
    View school transactions
  </Link>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

