import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import your raw news data file from the data folder
import newsData from '../data/news.json';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [homeQuery, setHomeQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeQuery.trim() !== '') {
      navigate(`/resources?search=${encodeURIComponent(homeQuery.trim())}`);
    } else {
      navigate('/resources');
    }
  };

  return (
    <>
      
      {/* Hero Header Section */}
      <header style={{ textAlign: 'center', margin: '3rem 0' }}>
        <p style={{ color: '#666', fontSize: '1.2rem' }}>A coalition of communities uniting our strengths to build resilient support networks for neighbors of all backgrounds.</p>
      </header>

      {/* Quick Resource Search Feature */}
      <section style={{ backgroundColor: '#f0f7ff', padding: '2.5rem', borderRadius: '8px', textAlign: 'center', marginBottom: '3rem' }}>
        <h3>{t('home.search_title', 'Find Local Assistance')}</h3>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.5rem', maxWidth: '600px', margin: '1rem auto 0' }}>
          <input
            type="text"
            placeholder={t('resources.search_placeholder', 'Search food, health, education...')}
            value={homeQuery}
            onChange={(e) => setHomeQuery(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ backgroundColor: '#0070f3', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            {t('home.search_btn', 'Search')}
          </button>
        </form>
      </section>

      {/* Main Content Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', minHeight: '300px' }}>
        
        {/* Left Column: News and Events Feed */}
        <section className="news-feed">
          <h2>📢 {t('home.news_heading', 'Latest News & Events')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            
            {/* Dynamically reading straight from your external file */}
            {newsData.map(item => (
              <article key={item.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#999', fontWeight: 'bold' }}>{item.date}</span>
                <h3 style={{ margin: '0.25rem 0 0.5rem 0', color: '#111' }}>{item.title}</h3>
                <p style={{ color: '#444', lineHeight: '1.5', margin: 0 }}>{item.body}</p>
              </article>
            ))}
            
          </div>
        </section>

        {/* Right Column: Quick Contact Sidebar */}
        <aside className="contact-sidebar" style={{ borderLeft: '1px solid #eee', paddingLeft: '2rem' }}>
          <h2>📬 {t('home.contact_heading', 'Contact Us')}</h2>
          <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.4' }}>Have questions about resources or want to join our staff of volunteers? Reach out anytime.</p>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#333' }}>
            <p><strong>Email:</strong> info@maldencommunityhub.org</p>
            <p><strong>Office:</strong> Malden, MA 02148</p>
          </div>
        </aside>

      </div>
    </>
  );
}