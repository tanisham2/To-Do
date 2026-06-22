'use client';

import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/lib/types';
import { Pencil, Trash2 } from 'lucide-react';
import TaskForm from './TaskForm';

const priorityEmoji = { high: '🔴', medium: '🟡', low: '🟢' };
const categoryEmoji = { study: '📚', work: '💼', personal: '🏠' };

interface TaskItemProps {
  task: Task;
  index: number;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Task>) => void;
}

export default function TaskItem({ task, index, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <TaskForm
        initialData={{
          title: task.title,
          description: task.description,
          priority: task.priority,
          category: task.category,
          due_date: task.due_date,
        }}
        onSubmit={(data) => {
          onUpdate(task.id, data);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex items-start justify-between p-3 border rounded-lg dark:border-gray-700 mb-2 bg-white dark:bg-gray-800"
        >
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => onToggle(task.id, e.target.checked)}
              className="mt-1"
            />
            <div>
              <p className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                {priorityEmoji[task.priority]} {task.title} {categoryEmoji[task.category]}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500">{task.description}</p>
              )}
              {task.due_date && (
                <p className="text-xs text-gray-400">Due: {task.due_date}</p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(true)} aria-label="Edit task" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Pencil size={16} />
            </button>
            <button onClick={() => onDelete(task.id)} aria-label="Delete task" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}