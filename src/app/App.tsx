
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { TaskManager } from '../components/TaskManager/TaskManager';

import type { Task } from '../types/task';

import './App.css';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete the dashboard interface',
    completed: true,
    createdAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Implement task management logic',
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: '3',
    title: 'Configure localStorage',
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: '4',
    title: 'Write unit tests',
    completed: true,
    createdAt: Date.now() - 172800000,
  },
];

export function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="app__main">
        <div className="app__content">
          <Header
            title="Overview"
            description="Manage your tasks and stay productive."
          />

          <TaskManager
            tasks={mockTasks}
            activeFilter="all"
            onAdd={() => {}}
            onFilterChange={() => {}}
            onToggle={() => {}}
            onDelete={() => {}}
          />
        </div>
      </main>
    </div>
  );
}
