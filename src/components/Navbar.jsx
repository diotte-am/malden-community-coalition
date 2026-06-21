import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import your local image asset using a relative path
import mccLogo from '../assets/MCC.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  // Helper function to apply an 'active' class to whichever page the user is currently viewing
  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  // Handler function to change language from the dropdown menu selection
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <nav className="navbar-element">
      <div className="navbar-container">
        
        {/* Left Side: Interactive Logo & Brand Anchor */}
        <div className="navbar-brand-section">
          <Link to="/" className="navbar-logo-link" aria-label="Malden Community Coalition Home">
            <img 
              src={mccLogo} 
              alt="Malden Community Coalition Logo" 
              className="navbar-logo-img" 
            />
            <span className="navbar-title-text">MCC</span>
          </Link>
        </div>

        {/* Right Side: Navigation Menu Items & Multi-language Selector */}
        <div className="navbar-links-section">
          <Link to="/" className="nav-link">
            {t('nav.home', 'Home')}
          </Link>
          
          <Link to="/resources" className="nav-link">
            {t('nav.resources', 'Resources')}
          </Link>

          <Link to="/videos" className="nav-link">
            {t('nav.videos', 'Videos')}
          </Link>

          <NavLink to="/staff" className="nav-link">
            {t('nav.staff', 'Staff')}
          </NavLink>

          <Link to="/contact" className="nav-link">
            {t('nav.contact', 'Contact')}
          </Link>

          {/* Accessible Dropdown Language Menu Selector */}
          <div className="lang-select-wrapper">
            <label htmlFor="navbar-lang-select" className="visually-hidden">
              🌐
            </label>
            <select 
              id="navbar-lang-select"
              className="lang-dropdown-menu" 
              value={i18n.language} 
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="pt">Português</option>
              <option value="zh">简体中文</option>
            </select>
          </div>
        </div>

      </div>
    </nav>
  );
}