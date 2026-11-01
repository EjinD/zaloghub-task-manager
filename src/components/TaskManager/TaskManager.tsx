
import { useMemo } from 'react';

import type { Task, TaskFilter } from '../../types/task';

import { TaskStats } from '../TaskStats/TaskStats';
import { TaskInput } from '../TaskInput/TaskInput';
import { TaskFilters } from '../TaskFilters/TaskFilters';
import { TaskList } from '../TaskList/TaskList';
import type { DeletedTask } from '../../hooks/useTasks';
import './TaskManager.css';

type TaskManagerProps = {
  tasks: Task[];
  activeFilter: TaskFilter;
  onAdd: (title: string) => void;
  onFilterChange: (filter: TaskFilter) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
  recentlyDeletedTask: DeletedTask | null;
  onUndoDelete: () => void;
};

export function TaskManager({
  tasks,
  activeFilter,
  onAdd,
  onFilterChange,
  onToggle,
  onDelete,
  onUpdate,
  recentlyDeletedTask,
  onUndoDelete,
}: TaskManagerProps) {
  const completedCount = tasks.filter(
    (task) => task.completed,
  ).length;

  const activeCount = tasks.length - completedCount;

  const progress =
  tasks.length === 0
    ? 0
    : Math.round((completedCount / tasks.length) * 100);

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'active':
        return tasks.filter((task) => !task.completed);

      case 'completed':
        return tasks.filter((task) => task.completed);

      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  return (
    <section className="task-manager">
      <TaskStats
        total={tasks.length}
        active={activeCount}
        completed={completedCount}
      />
      {recentlyDeletedTask && (
      <div
        className="task-snackbar"
        role="status"
        aria-live="polite"
      >
        <div className="task-snackbar__content">
          <span className="task-snackbar__title">
            Task deleted
          </span>

          <span className="task-snackbar__description">
            {recentlyDeletedTask.task.title}
          </span>
        </div>

        <button
          type="button"
          className="task-snackbar__undo"
          onClick={onUndoDelete}
        >
          Undo
        </button>
      </div>
    )}
      <div className="task-progress">
        <div className="task-progress__header">
          <span className="task-progress__label">
            Overall progress
          </span>

          <span className="task-progress__percentage">
            {progress}%
          </span>
        </div>

        <div
          className="task-progress__track"
          role="progressbar"
          aria-label="Task completion progress"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="task-progress__fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="task-progress__description">
          {completedCount} of {tasks.length} tasks completed
        </span>
      </div>

      <div className="task-manager__heading">
        <div>
          <h2 className="task-manager__title">My tasks</h2>
          <p className="task-manager__description">
            Keep track of everything you need to do.
          </p>
        </div>

        <span className="task-manager__count">
          {filteredTasks.length} tasks
        </span>
      </div>

      <TaskInput onAdd={onAdd} />

      <div className="task-manager__toolbar">
        <TaskFilters
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      <TaskList
        tasks={filteredTasks}
        onToggle={onToggle}
        onDelete={onDelete}
        onUpdate={onUpdate}
        filter={activeFilter}
      />
    </section>
  );
}
