
import { useMemo } from 'react';

import type { Task, TaskFilter } from '../../types/task';

import { TaskStats } from '../TaskStats/TaskStats';
import { TaskInput } from '../TaskInput/TaskInput';
import { TaskFilters } from '../TaskFitlers/TaskFilters';
import { TaskList } from '../TaskList/TaskList';

import './TaskManager.css';

type TaskManagerProps = {
  tasks: Task[];
  activeFilter: TaskFilter;
  onAdd: (title: string) => void;
  onFilterChange: (filter: TaskFilter) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, title: string) => void;
};

export function TaskManager({
  tasks,
  activeFilter,
  onAdd,
  onFilterChange,
  onToggle,
  onDelete,
  onUpdate
}: TaskManagerProps) {
  const completedCount = tasks.filter(
    (task) => task.completed,
  ).length;

  const activeCount = tasks.length - completedCount;

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
      />
    </section>
  );
}
