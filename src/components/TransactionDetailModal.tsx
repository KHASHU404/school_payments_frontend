// src/components/TransactionDetailModal.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineX, HiOutlineClipboardCopy, HiExternalLink } from 'react-icons/hi';

type Item = any;

export default function TransactionDetailModal({
  open,
  onClose,
  item,
}: {
  open: boolean;
  onClose: () => void;
  item: Item | null;
}) {
  if (!open) return null;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    // optionally show toast in page-level handler
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        className="relative z-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{item?.custom_order_id ?? 'Transaction details'}</h3>
            <p className="text-sm text-gray-500">{item?._id ? `Order ID: ${item._id}` : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            {item?.provider_url && (
              <a
                href={item.provider_url}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1 rounded border inline-flex items-center gap-1 text-sm"
              >
                Open Payment <HiExternalLink />
              </a>
            )}
            <button onClick={onClose} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              <HiOutlineX size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <LabelVal label="Collect ID" val={item?.collect_id ?? '-'} onCopy={() => copy(String(item?.collect_id ?? ''))} />
            <LabelVal label="Custom Order ID" val={item?.custom_order_id ?? '-'} onCopy={() => copy(String(item?.custom_order_id ?? ''))} />
            <LabelVal label="School ID" val={item?.school_id ?? '-'} onCopy={() => copy(String(item?.school_id ?? ''))} />
            <LabelVal label="Gateway" val={item?.gateway ?? item?.gateway_name ?? '-'} />
            <LabelVal label="Order Amount" val={formatAmount(item?.order_amount)} />
            <LabelVal label="Transaction Amount" val={formatAmount(item?.transaction_amount)} />
            <LabelVal label="Status" val={String(item?.status ?? item?.payment_status ?? '-')} />
            <LabelVal label="Payment Time" val={item?.payment_time ? new Date(item.payment_time).toLocaleString() : '-'} />
          </div>

          <div className="space-y-2">
            <div className="text-xs text-gray-500 mb-1">Student</div>
            <div className="border rounded p-3 bg-gray-50 dark:bg-gray-900">
              <div className="text-sm font-medium">{item?.student_info?.name ?? '-'}</div>
              <div className="text-xs text-gray-500">ID: {item?.student_info?.id ?? '-'}</div>
              <div className="text-xs text-gray-500">Email: {item?.student_info?.email ?? '-'}</div>
            </div>

            <div className="text-xs text-gray-500 mt-2">Raw payload</div>
            <pre className="max-h-48 overflow-auto text-xs bg-black/5 dark:bg-white/5 rounded p-2">
              {JSON.stringify(item?.raw_payload ?? item ?? {}, null, 2)}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={() => copy(JSON.stringify(item ?? {}, null, 2))}
                className="px-3 py-1 border rounded text-sm inline-flex items-center gap-2"
              >
                <HiOutlineClipboardCopy /> Copy JSON
              </button>
              <button onClick={() => { copy(String(item?._id ?? item?.custom_order_id ?? '')); }} className="px-3 py-1 border rounded text-sm">
                Copy ID
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LabelVal({ label, val, onCopy }: { label: string; val: string | number; onCopy?: () => void }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm">{val ?? '-'}</div>
        {onCopy && (
          <button onClick={onCopy} className="text-xs px-2 py-1 border rounded ml-2">Copy</button>
        )}
      </div>
    </div>
  );
}

function formatAmount(a: any) {
  if (a === undefined || a === null) return '-';
  return typeof a === 'number' ? a.toLocaleString() : String(a);
}
