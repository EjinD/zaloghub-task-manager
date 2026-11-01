
import { ClipboardList } from 'lucide-react';

import type { Task, TaskFilter } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';

import './TaskList.css';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  filter: TaskFilter;
};

const emptyStateContent: Record<
  TaskFilter,
  { title: string; description: string }
> = {
  all: {
    title: 'No tasks yet',
    description: 'Create your first task and start being productive.',
  },
  active: {
    title: 'All caught up!',
    description: 'You have completed all your tasks. Great job!',
  },
  completed: {
    title: 'Nothing completed yet',
    description: 'Complete your first task to see it here.',
  },
};

export function TaskList({
  tasks,
  filter,
  onToggle,
  onDelete,
  onUpdate,
}: TaskListProps) {
  const emptyState = emptyStateContent[filter];

  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <div className="task-list__empty-icon">
          <ClipboardList size={28} />
        </div>

        <h3 className="task-list__empty-title">
          {emptyState.title}
        </h3>

        <p className="task-list__empty-description">
          {emptyState.description}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
