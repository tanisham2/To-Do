'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 border rounded p-2 mb-4 dark:border-gray-600">
      <Search size={16} />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none w-full"
      />
    </div>
  );
}