import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

export default function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();

  // Helper function to apply an active style class to the tab the user is currently visiting
  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active-link' : 'nav-link';
  };

  return (
    <nav className="navbar" aria-label="Main Directory Navigation">
      {/* Left Container: Navigation Tabs / Links */}
      <div className="nav-links-container">
        <Link to="/" className={getLinkClass('/')}>
          {t('nav.home', 'Home')}
        </Link>
        <Link to="/resources" className={getLinkClass('/resources')}>
          {t('nav.resources', 'Resources')}
        </Link>
      </div>

      {/* Right Container: Pushed completely to the top right corner */}
      <div className="navbar-right-panel">
        <LanguageSelector />
      </div>
    </nav>
  );
}