'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Task, FilterType } from '@/lib/types';
import Navbar from '@/components/Navbar';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import FilterBar from '@/components/FilterBar';
import SearchBar from '@/components/SearchBar';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const fetchTasks = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('position', { ascending: true });
    if (data) setTasks(data as Task[]);
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
    if (user) fetchTasks();
  }, [user, loading, router, fetchTasks]);

  const handleAdd = async (data: {
    title: string;
    description: string;
    priority: Task['priority'];
    category: Task['category'];
    due_date: string | null;
  }) => {
    if (!user) return;
    const maxPosition = tasks.length > 0 ? Math.max(...tasks.map((t) => t.position)) : 0;
    const { data: newTask } = await supabase
      .from('tasks')
      .insert({ ...data, user_id: user.id, position: maxPosition + 1 })
      .select()
      .single();
    if (newTask) setTasks((prev) => [...prev, newTask as Task]);
  };

  const handleToggle = async (id: string, completed: boolean) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed } : t)));
    await supabase.from('tasks').update({ completed }).eq('id', id);
  };

  const handleDelete = async (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    await supabase.from('tasks').delete().eq('id', id);
  };

  const handleUpdate = async (id: string, data: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    await supabase.from('tasks').update(data).eq('id', id);
  };

  const handleReorder = async (reordered: Task[]) => {
    setTasks(reordered);
    await Promise.all(
      reordered.map((task, index) =>
        supabase.from('tasks').update({ position: index }).eq('id', task.id)
      )
    );
  };

  const handleClearCompleted = async () => {
    const completedIds = tasks.filter((t) => t.completed).map((t) => t.id);
    setTasks((prev) => prev.filter((t) => !t.completed));
    await supabase.from('tasks').delete().in('id', completedIds);
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    })
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  if (loading || !user) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      <div className="max-w-2xl mx-auto p-6">
        <TaskForm onSubmit={handleAdd} />
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar filter={filter} setFilter={setFilter} onClearCompleted={handleClearCompleted} />
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          onReorder={handleReorder}
        />
      </div>
    </div>
  );
}