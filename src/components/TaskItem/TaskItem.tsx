
import { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import type { Task } from '../../types/task';

import './TaskItem.css';

type TaskItemProps = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

export function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedTitle = editedTitle.trim();

    if (!normalizedTitle || normalizedTitle.length > 200) {
      return;
    }

    onUpdate(task.id, normalizedTitle);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedTitle(task.title);
    setIsEditing(false);
  }

  function handleEdit() {
    setEditedTitle(task.title);
    setIsEditing(true);
  }

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
          task.completed ? 'Mark as active' : 'Mark as completed'
        }
        aria-pressed={task.completed}
      >
        {task.completed && <Check size={14} />}
      </button>

      {isEditing ? (
        <form className="task-item__edit-form" onSubmit={handleSubmit}>
          <input
            className="task-item__edit-input"
            type="text"
            value={editedTitle}
            onChange={(event) => setEditedTitle(event.target.value)}
            maxLength={200}
            autoFocus
            aria-label="Edit task title"
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                handleCancel();
              }
            }}
          />

          <button
            type="submit"
            className="task-item__action task-item__action--save"
            aria-label="Save changes"
            disabled={!editedTitle.trim()}
          >
            <Check size={17} />
          </button>

          <button
            type="button"
            className="task-item__action"
            onClick={handleCancel}
            aria-label="Cancel editing"
          >
            <X size={17} />
          </button>
        </form>
      ) : (
        <>
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
              onClick={handleEdit}
              aria-label="Edit task"
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
        </>
      )}
    </article>
  );
}
