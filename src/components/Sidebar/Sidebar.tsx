
import {
  CheckSquare,
  CircleCheck,
  LayoutDashboard,
  Settings,
  Zap,
} from 'lucide-react';

import './Sidebar.css';

const navigationItems = [
  {
    label: 'Overview',
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: 'My tasks',
    icon: CheckSquare,
    active: false,
  },
  {
    label: 'Completed',
    icon: CircleCheck,
    active: false,
  },
];

export function Sidebar() {
  return (
      <aside className="sidebar">
        <div className="sidebar__logo">
            <div className="sidebar__logo-icon">
            <Zap size={20} />
            </div>

         <span className="sidebar__logo-text">Focus</span>
        </div>

      <div className="sidebar__section">
        <span className="sidebar__section-title">
          WORKSPACE
        </span>

        <nav className="sidebar__navigation">
          {navigationItems.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={`sidebar__nav-item ${
                active ? 'sidebar__nav-item--active' : ''
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </div>
          ))}
        </nav>
       </div>
         <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">D</div>

          <div className="sidebar__user-info">
            <span className="sidebar__user-name">Developer</span>
            <span className="sidebar__user-role">Personal workspace</span>
            </div>
            <Settings size={18} className="sidebar__settings" />
            </div>
        </div>
    </aside>
  );
}
