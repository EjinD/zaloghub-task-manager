
import { Check, Pencil, Trash2 } from 'lucide-react';
import type { Task } from '../../types/task';

import './TaskItem.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <article
      className={`task-item ${
        task.completed ? 'task-item--completed' : ''
      }`}
    >
      <button
        type="button"
        className="task-item__checkbox"
        onClick={() => onToggle(task.id)}
        aria-label={
          task.completed
            ? 'Mark as active'
            : 'Mark as completed'
        }
        aria-pressed={task.completed}
      >
        {task.completed && <Check size={14} />}
      </button>

      <div className="task-item__content">
        <span className="task-item__title">
          {task.title}
        </span>

        <span className="task-item__date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="task-item__action"
          aria-label="Edit task"
          disabled
        >
          <Pencil size={17} />
        </button>

        <button
          type="button"
          className="task-item__action task-item__action--delete"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </article>
  );
}
