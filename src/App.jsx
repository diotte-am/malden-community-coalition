import React from 'react';
// HashRouter is needed with single page websites, browserRouter will get 404 error on refresh
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import both active components
import Home from './pages/Home';
import Resources from './pages/Resources';

export default function App() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
        
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #eee', alignItems: 'center' }}>
          <div className="nav-links" style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            <Link to="/resources" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>{t('nav.resources', 'Resources')}</Link>
          </div>
          {/* Language selectors stay here */}
        </nav>

        <main>
          <Routes>
            {/* Home component now handles the root landing layout path */}
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}