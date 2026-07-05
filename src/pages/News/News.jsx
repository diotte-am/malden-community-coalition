import React from 'react';
import { useTranslation } from 'react-i18next';

// 1. Direct scoped style binding
import './News.css';

// 2. Load local news data structure 
import newsData from '../../data/news.json';

// 3. Import component folders (Vite automatically targets their index.js files)
import NewsCard from '../../components/NewsCard';
import PageHero from '../../components/PageHero';

export default function News() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero 
        title={t('news:page_title')} 
        subtitle={t('news:page_subtitle')} 
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
              {t('news.search_placeholder')}
            </div>
          )}

        </div>
      </main>
    </>
  );
}