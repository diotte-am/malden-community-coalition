import React, { useState, useMemo } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Load data structures directly
import newsData from '../data/news.json';
import rawVideoData from '../data/videos.json';
import resourceData from '../data/resources.json';

// Reuse our unified, cleanly stylized card variants
import VideoCard from '../components/VideoCard';
import ResourceCard from '../components/ResourceCard';
import HomeFeaturedSection from '../components/HomeFeaturedSection';

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

  // 1. DYNAMIC DATA INTERCEPTORS
  const latestVideo = useMemo(() => {
    const validVideos = rawVideoData.filter(item => item && item.id && item.youtubeId);
    return validVideos[0] || null;
  }, []);

  const resourceOfTheDay = useMemo(() => {
    if (!resourceData || resourceData.length === 0) return null;
    const daySeed = new Date().getDate();
    const index = daySeed % resourceData.length;
    return resourceData[index];
  }, []);

  const previewNews = useMemo(() => {
    return (newsData || []).slice(0, 2);
  }, []);

  return (
    <>
      {/* 1. Large Heritage Gradient Banner */}
      <header className="page-hero-banner home-page-hero">
        <div className="home-hero-inner">
          <h1 className="home-hero-title">
            Malden Community Coalition
          </h1>
          <p className="home-hero-subtitle">
            A coalition of communities uniting our strengths to build resilient support networks for neighbors of all backgrounds.
          </p>
        </div>
      </header>

      {/* Primary Shared Bound Margin Container */}
      <main className="page-container home-search-panel">
        
        {/* 2. Overlapping Search Bar Console Dashboard */}
        <section className="search-accent-container">
          <h3 className="search-panel-heading">
            {t('home.search_title', 'Find Local Assistance')}
          </h3>
          <form onSubmit={handleSearchSubmit} className="home-search-form">
            <input
              type="text"
              placeholder={t('resources.search_placeholder', 'Search food, health, housing support...')}
              value={homeQuery}
              onChange={(e) => setHomeQuery(e.target.value)}
              className="home-search-input"
            />
            <button type="submit" className="btn-action-primary home-search-submit-btn">
              {t('home.search_btn', 'Search')}
            </button>
          </form>

          <div className="search-footer-quicklink">
            <NavLink to="/resources">
              Browse all community resources →
            </NavLink>
          </div>
        </section>

        {/* 3. Main Split Content Blueprint */}
        <div className="card-main-split">
          
          {/* Left Main Content Track: News & Dynamic Highlight Features */}
          <div className="home-main-content-column">
            
            {/* Componentized Live Video Spotlight Feature */}
            {latestVideo && (
              <HomeFeaturedSection
                title={`📺 ${t('home.featured_video', 'Latest Broadcast Updates')}`}
                linkTo="/videos"
                linkText="See more updates →"
              >
                <VideoCard video={latestVideo} descKey={descKey} onTagClick={() => navigate('/videos')} />
              </HomeFeaturedSection>
            )}

            {/* Componentized Resource Spotlight Feature */}
            {resourceOfTheDay && (
              <HomeFeaturedSection
                title={`💡 ${t('home.featured_resource', 'Resource Spotlight')}`}
                linkTo="/resources"
                linkText="See more resources →"
              >
                <ResourceCard resource={resourceOfTheDay} descKey={descKey} />
              </HomeFeaturedSection>
            )}

            {/* Componentized News and Bulletins Feed Block */}
            {previewNews.length > 0 && (
              <HomeFeaturedSection
                title={`📢 ${t('home.news_heading', 'Latest News & Events')}`}
                linkTo="/news"
                linkText="See more news announcements →"
              >
                <div className="vertical-stack-container">
                  {previewNews.map(item => (
                    <article key={item.id} className="horizontal-row-card news-preview-card">
                      <div className="card-content-stack news-preview-stack">
                        <header className="news-preview-header">
                          <h3 className="card-title-highlight news-preview-title">{item.title}</h3>
                          <span className="card-meta-badge news-preview-badge">{item.date}</span>
                        </header>
                        <p className="card-description-body news-preview-body">{item.body}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </HomeFeaturedSection>
            )}

          </div>

          {/* Right Main Content Column: Quick Contact Info Sticky Sidebar */}
          <aside className="horizontal-row-card home-sticky-sidebar">
            <div className="card-content-stack">
              <h2 className="sidebar-title">📬 {t('home.contact_heading', 'Contact Us')}</h2>
              <p className="card-description-body sidebar-body-text">
                Have questions about resources or want to join our team of volunteers? Reach out anytime.
              </p>
              <hr className="sidebar-divider" />
              <div className="sidebar-contact-details">
                <div>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:info@maldencommunityhub.org" className="nav-link">
                    info@maldencommunityhub.org
                  </a>
                </div>
                <div><strong>Office:</strong> Malden, MA 02148</div>
              </div>
              <div className="sidebar-action-container">
                <NavLink to="/contact" className="card-flush-footer-link">
                  See contact details →
                </NavLink>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </>
  );
}