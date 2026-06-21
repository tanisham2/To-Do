'use client';

import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold">📝 To-Do</h1>
      <div className="flex items-center gap-4">
        {user && <span className="text-sm">{user.email}</span>}
        <ThemeToggle />
        {user && (
          <button
            onClick={handleSignOut}
            className="text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}