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
   <header className="site-header">
      {/* 1. TOP BRAND BANNER ROW */}
      <div className="brand-banner-row">
        
        {/* Left Side: Logo & Group Identity */}
        <div className="brand-identity-box">
          {/* Square Logo Placeholder - Replace 'logo-placeholder.png' with your real file asset later */}
          <div className="logo-square-container">
            <img 
              src="./MCC.png" 
              alt="Malden Community Coalition logo" 
              className="brand-logo-img"
              onError={(e) => {
                // Generates a clean grey fallback container box if the image file isn't in your directory yet
                e.target.style.display = 'none';
                e.target.parentNode.classList.add('logo-fallback-style');
              }}
            />
          </div>
          
          <div className="brand-text-details">
            <h1 className="organization-title">Malden Community Coalition</h1>
            <p className="organization-mission">
              {t('header.mission', 'A coalition of communities in Malden putting their strengths together to create strong, resilient support networks for Malden residents of all backgrounds.')}
            </p>
          </div>
        </div>

        {/* Right Side: Accessible Language Control Dropdown */}
        <div className="header-right-controls">
          <LanguageSelector />
        </div>

      </div>

      {/* 2. LOWER NAVIGATION TOOLBAR ROW */}
      <nav className="navbar" aria-label="Main Directory Navigation">
        <div className="nav-links-container">
          <Link to="/" className={getLinkClass('/')}>
            {t('nav.home', 'Home')}
          </Link>
          <Link to="/resources" className={getLinkClass('/resources')}>
            {t('nav.resources', 'Resources')}
          </Link>
        </div>
      </nav>
    </header>
  );
}