'use client';

import { useState } from 'react';
import { Priority, Category } from '@/lib/types';

interface TaskFormProps {
  onSubmit: (data: {
    title: string;
    description: string;
    priority: Priority;
    category: Category;
    due_date: string | null;
  }) => void;
  initialData?: {
    title: string;
    description?: string;
    priority: Priority;
    category: Category;
    due_date: string | null;
  };
  onCancel?: () => void;
}

export default function TaskForm({ onSubmit, initialData, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority ?? 'medium');
  const [category, setCategory] = useState<Category>(initialData?.category ?? 'personal');
  const [dueDate, setDueDate] = useState(initialData?.due_date ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, priority, category, due_date: dueDate || null });
    if (!initialData) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setCategory('personal');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-4">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
        required
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
      />
      <div className="flex gap-2 flex-wrap">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
        >
          <option value="study">📚 Study</option>
          <option value="work">💼 Work</option>
          <option value="personal">🏠 Personal</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border rounded bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-white"
        />
      </div>
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}