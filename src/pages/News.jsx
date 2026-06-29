import React from 'react';
import { useTranslation } from 'react-i18next';

// Load local news data structure directly matching your Home view
import newsData from '../data/news.json';

// Import our newly created card component
import NewsCard from '../components/NewsCard';

export default function News() {
  const { t } = useTranslation();

  return (
    <>
      {/* Heritage Sub-Page Banner Layout matching your brand standards */}
      <header className="page-hero-banner news-page-hero">
        <div className="page-hero-content news-page-hero-inner">
          <h1 className="news-page-title">
            {t('news.page_title', 'Latest News & Events')}
          </h1>
          <p className="page-subtitle news-page-subtitle">
            {t('news.page_subtitle', 'Stay updated with upcoming meetings, resource rollouts, and local coalition announcements.')}
          </p>
        </div>
      </header>

      {/* Main Content Grid Area */}
      <main className="page-container news-main-content">
        <div className="vertical-stack-container news-list-stack news-full-view">
          
          {newsData && newsData.length > 0 ? (
            newsData.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))
          ) : (
            <div className="news-empty-state">
              {t('news.no_records', 'No current news or upcoming events announcements found.')}
            </div>
          )}

        </div>
      </main>
    </>
  );
}