
import { ClipboardList } from 'lucide-react';

import type { Task } from '../../types/task';
import { TaskItem } from '../TaskItem/TaskItem';

import './TaskList.css';

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onUpdate
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="task-list__empty">
        <div className="task-list__empty-icon">
          <ClipboardList size={28} />
        </div>

        <h3 className="task-list__empty-title">
          No tasks found
        </h3>

        <p className="task-list__empty-description">
          Your task list is empty. Add a new task to get started.
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
