
import type { TaskFilter } from '../../types/task';

import './TaskFilters.css';

type TaskFiltersProps = {
  activeFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
};

const filters: { label: string; value: TaskFilter }[] = [
  { label: 'All tasks', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function TaskFilters({
  activeFilter,
  onFilterChange,
}: TaskFiltersProps) {
  return (
    <div className="task-filters">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          className={`task-filters__button ${
            activeFilter === value
              ? 'task-filters__button--active'
              : ''
          }`}
          onClick={() => onFilterChange(value)}
          aria-pressed={activeFilter === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
