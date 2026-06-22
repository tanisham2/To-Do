'use client';

import { FilterType } from '@/lib/types';

interface FilterBarProps {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  onClearCompleted: () => void;
}

export default function FilterBar({ filter, setFilter, onClearCompleted }: FilterBarProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
      <div className="flex gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-sm capitalize ${
              filter === f ? 'bg-blue-600 text-white' : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <button onClick={onClearCompleted} className="text-sm text-red-500 hover:underline">
        Clear Completed
      </button>
    </div>
  );
}