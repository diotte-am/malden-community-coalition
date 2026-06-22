import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Load data structures directly
import newsData from '../data/news.json';
import rawVideoData from '../data/videos.json';
import resourceData from '../data/resources.json';

// Reuse our unified, cleanly stylized card variants
import VideoCard from '../components/VideoCard';
import ResourceCard from '../components/ResourceCard';

export default function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [homeQuery, setHomeQuery] = useState('');

  // Handle active locale tokens safely for description bindings
  const currentLang = i18n.language || 'en';
  const descKey = `desc_${currentLang.split('-')[0]}`;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (homeQuery.trim() !== '') {
      navigate(`/resources?search=${encodeURIComponent(homeQuery.trim())}`);
    } else {
      navigate('/resources');
    }
  };

  // 1. DYNAMIC DATA INTERCEPTORS: Grabs latest video & selects a stable daily feature resource
  const latestVideo = useMemo(() => {
    const validVideos = rawVideoData.filter(item => item && item.id && item.youtubeId);
    return validVideos[0] || null; // Pulls index 0 (Newest chronologically from JSON array)
  }, []);

  const resourceOfTheDay = useMemo(() => {
    if (!resourceData || resourceData.length === 0) return null;
    // Uses date parameters to seed a pseudorandom stable picker, rotating exactly once every 24 hours
    const daySeed = new Date().getDate();
    const index = daySeed % resourceData.length;
    return resourceData[index];
  }, []);

  return (
    <>
      {/* 1. Large Heritage Gradient Banner with Enhanced Center Branding Logo Wordmark */}
      <header className="page-hero-banner" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="page-hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Prominent Logo Wordmark Subhead Display */}
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#ffffff', textShadow: '0 2px 8px rgba(0,0,0,0.25)', margin: '0 0 1rem 0', letterSpacing: '-0.5px' }}>
            Malden Community Coalition
          </h1>
          <p className="page-subtitle" style={{ fontSize: '1.25rem', opacity: 0.95, maxWidth: '650px', margin: '0 auto' }}>
            A coalition of communities uniting our strengths to build resilient support networks for neighbors of all backgrounds.
          </p>
        </div>
      </header>

      {/* Primary Shared Bound Margin Container */}
      <main className="page-container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        
        {/* 2. Overlapping Search Bar Console Dashboard using .horizontal-row-card rules */}
        <section className="horizontal-row-card" style={{ marginBottom: '3rem', padding: '2rem' }}>
          <h3 style={{ marginTop: 0, color: 'var(--brand-wordmark-blue)', fontSize: '1.25rem', fontWeight: 700 }}>
            {t('home.search_title', 'Find Local Assistance')}
          </h3>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
            <input
              type="text"
              placeholder={t('resources.search_placeholder', 'Search food, health, housing support...')}
              value={homeQuery}
              onChange={(e) => setHomeQuery(e.target.value)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '250px' }}
            />
            <button 
              type="submit" 
              className="btn-action-primary"
              style={{ padding: '0.75rem 2rem', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}
            >
              {t('home.search_btn', 'Search')}
            </button>
          </form>
        </section>

        {/* 3. Main Split Content Blueprint */}
        <div className="card-main-split" style={{ alignItems: 'flex-start', gap: '2rem' }}>
          
          {/* Left Main Content Track: News & Dynamic Highlight Features */}
          <div className="card-text-details-quadrant" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            {/* Dynamic Live Spotlight Features Column */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {latestVideo && (
                <div>
                  <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.5rem', marginBottom: '1rem' }}>📺 {t('home.featured_video', 'Latest Broadcast Updates')}</h2>
                  <VideoCard video={latestVideo} descKey={descKey} onTagClick={() => navigate('/videos')} />
                </div>
              )}

              {resourceOfTheDay && (
                <div style={{ marginTop: '1rem' }}>
                  <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.5rem', marginBottom: '1rem' }}>💡 {t('home.featured_resource', 'Resource Spotlight')}</h2>
                  <ResourceCard resource={resourceOfTheDay} descKey={descKey} />
                </div>
              )}
            </section>

            {/* News and Bulletins Feed Block using standard clean cards */}
            <section className="news-feed" style={{ marginTop: '1rem' }}>
              <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.5rem', marginBottom: '1rem' }}>📢 {t('home.news_heading', 'Latest News & Events')}</h2>
              <div className="vertical-stack-container">
                {newsData.map(item => (
                  <article key={item.id} className="horizontal-row-card">
                    <div className="card-content-stack">
                      <header className="card-header-row">
                        <h3 className="card-title-highlight" style={{ fontSize: '1.15rem' }}>{item.title}</h3>
                        <span className="card-meta-badge" style={{ fontSize: '0.85rem' }}>{item.date}</span>
                      </header>
                      <hr className="card-divider-line" />
                      <p className="card-description-body">{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* Right Main Content Column: Quick Contact Info Sticky Sidebar */}
          <aside className="horizontal-row-card" style={{ flex: '0 0 300px', width: '300px', position: 'sticky', top: '2rem' }}>
            <div className="card-content-stack">
              <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.3rem', margin: '0 0 0.5rem 0' }}>📬 {t('home.contact_heading', 'Contact Us')}</h2>
              <p className="card-description-body" style={{ fontSize: '0.95rem' }}>
                Have questions about resources or want to join our team of volunteers? Reach out anytime.
              </p>
              <hr className="card-divider-line" />
              <div style={{ fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Email:</strong> <a href="mailto:info@maldencommunityhub.org" className="nav-link" style={{ display: 'inline' }}>info@maldencommunityhub.org</a></div>
                <div><strong>Office:</strong> Malden, MA 02148</div>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}