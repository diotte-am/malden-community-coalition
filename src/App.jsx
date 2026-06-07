import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 1. Import your brand new component
import LanguageSelector from './components/LanguageSelector';
import Home from './pages/Home';
import Resources from './pages/Resources';

export default function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <div className="app-container">
        
        <nav className="navbar" aria-label="Main Directory Navigation">
          <div className="nav-links">
            <Link to="/">{t('nav.home', 'Home')}</Link>
            <Link to="/resources" style={{ fontWeight: 'bold' }}>
              {t('nav.resources', 'Resources')}
            </Link>
          </div>
          <LanguageSelector />
        </nav>

        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}