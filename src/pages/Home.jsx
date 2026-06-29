import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  // Limits the home feed layout to the 2 freshest entries to keep the layout compact
  const previewNews = useMemo(() => {
    return (newsData || []).slice(0, 2);
  }, []);

  return (
    <>
      {/* 1. Large Heritage Gradient Banner with Enhanced High-Contrast Dark Blue Typography */}
      <header className="page-hero-banner" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="page-hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Flipped color to high-contrast brand dark blue for readability over pastel gradients */}
          <h1 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--brand-wordmark-blue, #0d3b66)', margin: '0 0 1rem 0', letterSpacing: '-0.5px' }}>
            Malden Community Coalition
          </h1>
          <p className="page-subtitle" style={{ fontSize: '1.25rem', color: '#333333', maxWidth: '650px', margin: '0 auto', fontWeight: 500 }}>
            A coalition of communities uniting our strengths to build resilient support networks for neighbors of all backgrounds.
          </p>
        </div>
      </header>

      {/* Primary Shared Bound Margin Container */}
      <main className="page-container" style={{ marginTop: '-2rem', position: 'relative', zIndex: 10 }}>
        
        {/* 2. Overlapping Search Bar Console Dashboard with Restored Soft Blue Accent Styling */}
        <section className="search-accent-container" style={{ marginBottom: '2rem', padding: '2rem', backgroundColor: '#f0f7ff', border: '1px solid #d0e4ff', borderRadius: '8px' }}>
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

          {/* Left-aligned Quick Link to browse all items immediately beneath search */}
          <div style={{ marginTop: '0.75rem', textAlign: 'left' }}>
            <Link to="/resources" style={{ fontSize: '0.9rem', color: 'var(--brand-wordmark-blue, #0d3b66)', fontWeight: '600', textDecoration: 'underline' }}>
              Browse all community resources →
            </Link>
          </div>
        </section>

        {/* 3. Main Split Content Blueprint - Gaps tightened down from 2.5rem to 1.5rem */}
        <div className="card-main-split" style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
          
          {/* Left Main Content Track: News & Dynamic Highlight Features */}
          <div className="card-text-details-quadrant" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Dynamic Live Spotlight Features Stack */}
            {latestVideo && (
              <div>
                <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>📺 {t('home.featured_video', 'Latest Broadcast Updates')}</h2>
                <VideoCard video={latestVideo} descKey={descKey} onTagClick={() => navigate('/videos')} />
                <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                  <Link to="/videos" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--brand-logo-orange, #f77f00)', textDecoration: 'none' }}>
                    See more updates →
                  </Link>
                </div>
              </div>
            )}

            {resourceOfTheDay && (
              <div>
                <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>💡 {t('home.featured_resource', 'Resource Spotlight')}</h2>
                <ResourceCard resource={resourceOfTheDay} descKey={descKey} />
                <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                  <Link to="/resources" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--brand-logo-orange, #f77f00)', textDecoration: 'none' }}>
                    See more resources →
                  </Link>
                </div>
              </div>
            )}

            {/* News and Bulletins Feed Block - Closed down spacing with 2-item preview threshold */}
            <section className="news-feed">
              <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>📢 {t('home.news_heading', 'Latest News & Events')}</h2>
              <div className="vertical-stack-container" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {previewNews.map(item => (
                  <article key={item.id} className="horizontal-row-card" style={{ padding: '1rem 1.5rem' }}>
                    <div className="card-content-stack" style={{ gap: '0.25rem' }}>
                      <header className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 className="card-title-highlight" style={{ fontSize: '1.1rem', margin: 0 }}>{item.title}</h3>
                        <span className="card-meta-badge" style={{ fontSize: '0.8rem' }}>{item.date}</span>
                      </header>
                      <p className="card-description-body" style={{ margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>{item.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div style={{ marginTop: '0.5rem', textAlign: 'right' }}>
                <Link to="/news" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--brand-logo-orange, #f77f00)', textDecoration: 'none' }}>
                  See more news announcements →
                </Link>
              </div>
            </section>

          </div>

          {/* Right Main Content Column: Quick Contact Info Sticky Sidebar */}
          <aside className="horizontal-row-card" style={{ flex: '0 0 300px', width: '300px', position: 'sticky', top: '2rem' }}>
            <div className="card-content-stack">
              <h2 style={{ color: 'var(--brand-wordmark-blue)', fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>📬 {t('home.contact_heading', 'Contact Us')}</h2>
              <p className="card-description-body" style={{ fontSize: '0.9rem', margin: '0 0 1rem 0' }}>
                Have questions about resources or want to join our team of volunteers? Reach out anytime.
              </p>
              <hr className="card-divider-line" style={{ margin: '0 0 1rem 0', border: '0', borderTop: '1px solid var(--border-color)' }} />
              <div style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div><strong>Email:</strong> <a href="mailto:info@maldencommunityhub.org" className="nav-link" style={{ display: 'inline', padding: 0 }}>info@maldencommunityhub.org</a></div>
                <div><strong>Office:</strong> Malden, MA 02148</div>
              </div>
              <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <Link to="/contact" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--brand-logo-orange, #f77f00)', textDecoration: 'none' }}>
                  See contact details →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}