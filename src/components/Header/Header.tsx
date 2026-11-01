
import { Bell, Search } from 'lucide-react';

import './Header.css';

type HeaderProps = {
  title: string;
  description: string;
};

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__heading">
        <h1 className="header__title">{title}</h1>
        <p className="header__description">{description}</p>
      </div>

      <div className="header__actions">
        <button
          className="header__icon-button"
          type="button"
          aria-label="Search"
        >
          <Search size={19} />
        </button>

        <button
          className="header__icon-button"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>
      </div>
    </header>
  );
}
