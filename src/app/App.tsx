
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';
import { TaskManager } from '../components/TaskManager/TaskManager';

import { useTasks } from '../hooks/useTasks';

import './App.css';

export function App() {
  const {
    tasks,
    activeFilter,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    setFilter,
  } = useTasks();

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
            tasks={tasks}
            activeFilter={activeFilter}
            onAdd={addTask}
            onFilterChange={setFilter}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        </div>
      </main>
    </div>
  );
}
