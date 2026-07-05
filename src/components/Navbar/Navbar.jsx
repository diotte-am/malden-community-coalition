import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 1. Direct local scoped style binding
import './Navbar.css';

// 2. Import local asset adjusted for the new folder depth
import mccLogo from '../../assets/MCC.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  // Handler function to change language from the dropdown menu selection
  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <nav className="navbar-element">
      <div className="navbar-container">
        
        {/* Left Side Group: Logo + Navigation Links aligned together seamlessly */}
        <div className="navbar-brand-section">
          {/* Logo acts as the exclusive Home link now */}
          <NavLink to="/" className="navbar-logo-link" aria-label="Malden Community Coalition Home">
            <img 
              src={mccLogo} 
              alt="Malden Community Coalition Logo" 
              className="navbar-logo-img" 
            />
            <span className="navbar-title-text"></span>
          </NavLink>

          {/* Core navigation tracks shifted over to the left wing */}
          <div className="navbar-links-track">
            <NavLink to="/resources" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {t('common:nav.resources', 'Resources')}
            </NavLink>

            <NavLink to="/videos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {t('common:nav.videos', 'Videos')}
            </NavLink>

            {/* Dedicated News feed navigation node */}
            <NavLink to="/news" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {t('common:nav.news', 'News')}
            </NavLink>

            <NavLink to="/staff" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {t('common:nav.staff', 'Staff')}
            </NavLink>

            <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {t('common:nav.contact', 'Contact')}
            </NavLink>
          </div>
        </div>

        {/* Right Side Group: Stays isolated on the right edge */}
        <div className="navbar-right-wing">
          {/* Accessible Dropdown Language Menu Selector */}
          <div className="lang-select-wrapper">
            <label htmlFor="navbar-lang-select" className="visually-hidden">
              Select Language
            </label>
            <select 
              id="navbar-lang-select"
              className="lang-dropdown-menu" 
              value={i18n.language?.split('-')[0] || 'en'} // Prevents 'en-US' from breaking 'en' value matching
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