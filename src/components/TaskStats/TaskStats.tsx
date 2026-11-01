
import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import './TaskStats.css';

type TaskStatsProps = {
  total: number;
  active: number;
  completed: number;
};

type StatItem = {
  label: string;
  value: number;
  icon: LucideIcon;
  variant: 'primary' | 'warning' | 'success';
};

export function TaskStats({
  total,
  active,
  completed,
}: TaskStatsProps) {
  const stats: StatItem[] = [
    {
      label: 'Total tasks',
      value: total,
      icon: ListTodo,
      variant: 'primary',
    },
    {
      label: 'In progress',
      value: active,
      icon: Circle,
      variant: 'warning',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      variant: 'success',
    },
  ];

  return (
    <section className="task-stats">
      {stats.map(({ label, value, icon: Icon, variant }) => (
        <article
          key={label}
          className={`task-stats__card task-stats__card--${variant}`}
        >
          <div className="task-stats__top">
            <span className="task-stats__label">{label}</span>

            <div className="task-stats__icon">
              <Icon size={20} />
            </div>
          </div>

          <span className="task-stats__value">{value}</span>
        </article>
      ))}
    </section>
  );
}
