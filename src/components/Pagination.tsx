// src/components/Pagination.tsx
import React from 'react';

type Props = {
  page: number;
  total: number;
  limit: number;
  onPage: (p: number) => void;
};

export default function Pagination({ page, total, limit, onPage }: Props) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(totalPages, page + 1));

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={prev}
        disabled={page <= 1}
        className="px-3 py-1 rounded border disabled:opacity-50"
        aria-label="Previous page"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button className="px-3 py-1 rounded border" onClick={() => onPage(1)}>
            1
          </button>
          {start > 2 && <span className="px-2">…</span>}
        </>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`px-3 py-1 rounded border ${p === page ? 'bg-brand-500 text-white' : ''}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-2">…</span>}
          <button className="px-3 py-1 rounded border" onClick={() => onPage(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button onClick={next} disabled={page >= totalPages} className="px-3 py-1 rounded border">
        Next
      </button>
    </div>
  );
}
