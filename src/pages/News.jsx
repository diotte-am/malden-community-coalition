import React from 'react';
import { useTranslation } from 'react-i18next';

// Load local news data structure directly matching your Home view
import newsData from '../data/news.json';

// Import our newly created card component
import NewsCard from '../components/NewsCard';
import PageHero from '../components/PageHero';

export default function News() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero 
        title={t('staff.page_title', 'Our Team')} 
        subtitle={t('staff.page_subtitle', 'Meet the dedicated staff members working behind the scenes to advocate for the Malden community.')} 
      />

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