export type Priority = 'high' | 'medium' | 'low';
export type Category = 'study' | 'work' | 'personal';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  due_date: string | null;
  position: number;
  created_at: string;
}

export type FilterType = 'all' | 'active' | 'completed';