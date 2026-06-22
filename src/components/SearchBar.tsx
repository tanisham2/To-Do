'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 border rounded p-2 mb-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600">
      <Search size={16} className="text-gray-400 dark:text-gray-500" />
      <input
        type="text"
        placeholder="Search tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none w-full text-gray-900 dark:text-white placeholder:text-gray-400"
      />
    </div>
  );
}