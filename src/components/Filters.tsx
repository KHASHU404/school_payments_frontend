// src/components/Filters.tsx
import React from 'react';

type Props = {
  statuses: string[];
  schools: string[]; // list of school ids (or objects if you want)
  selectedStatuses: string[];
  setSelectedStatuses: (s: string[]) => void;
  selectedSchool: string | null;
  setSelectedSchool: (s: string | null) => void;
  onDateRange?: (from: string | null, to: string | null) => void;
};

export default function Filters({
  statuses,
  schools,
  selectedStatuses,
  setSelectedStatuses,
  selectedSchool,
  setSelectedSchool,
  onDateRange,
}: Props) {
  const toggleStatus = (s: string) => {
    if (selectedStatuses.includes(s)) setSelectedStatuses(selectedStatuses.filter(x => x !== s));
    else setSelectedStatuses([...selectedStatuses, s]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border mb-4 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
      <div className="flex gap-3 items-center flex-wrap">
        <div>
          <div className="text-xs font-medium mb-1">Status</div>
          <div className="flex gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => toggleStatus(s)}
                className={`px-3 py-1 rounded-full text-sm border ${
                  selectedStatuses.includes(s) ? 'bg-brand-500 text-white' : 'bg-transparent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-medium mb-1">School</div>
          <select
            value={selectedSchool ?? ''}
            onChange={(e) => setSelectedSchool(e.target.value || null)}
            className="px-3 py-1 rounded border bg-gray-50 dark:bg-gray-700"
          >
            <option value="">All schools</option>
            {schools.map((sch) => (
              <option key={sch} value={sch}>
                {sch}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2">
          <label className="text-xs">From</label>
          <input
            type="date"
            onChange={(e) => onDateRange?.(e.target.value || null, null)}
            className="px-2 py-1 rounded border bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs">To</label>
          <input
            type="date"
            onChange={(e) => onDateRange?.(null, e.target.value || null)}
            className="px-2 py-1 rounded border bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <button
          onClick={() => {
            setSelectedStatuses([]);
            setSelectedSchool(null);
            onDateRange?.(null, null);
          }}
          className="px-3 py-1 rounded border text-sm"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
