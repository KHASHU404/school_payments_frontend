// src/pages/StatusCheckPage.tsx
import React, { useState } from 'react';
import api from '../api/axios';
import { Button } from '../components/ui/Button';

export default function StatusCheckPage() {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const check = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setResult(null);
    if (!id.trim()) return setError('Please enter a valid order id');
    setLoading(true);
    try {
      const r = await api.get(`/transactions/status/${encodeURIComponent(id.trim())}`);
      setResult(r.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to fetch status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-br from-cyan-50 to-white p-8 rounded-2xl shadow-xl border border-cyan-100/30">
  <h3 className="text-lg font-semibold text-cyan-800">Check Transaction Status</h3>
      <form onSubmit={check} className="flex gap-2">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter custom_order_id"
          className="flex-1 p-2 border rounded bg-gray-50 dark:bg-gray-700"
        />
        <Button type="submit" disabled={loading}>{loading ? 'Checking...' : 'Check'}</Button>
      </form>

      {error && <div className="mt-3 text-red-500">{error}</div>}

      {result && (
        <div className="mt-4 p-3 border rounded bg-gray-50 dark:bg-gray-900">
          <div className="text-sm">Status: <strong>{result.status ?? result.payment_status ?? '—'}</strong></div>
          <pre className="mt-2 text-xs max-h-48 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
