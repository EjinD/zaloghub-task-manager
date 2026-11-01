
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header/Header';

import './App.css';

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
        </div>
      </main>
    </div>
  );
}
