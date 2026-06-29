import React from 'react';
import { useTranslation } from 'react-i18next';

// Load local news data structure directly matching your Home view
import newsData from '../data/news.json';

export default function News() {
  const { t } = useTranslation();

  return (
    <>
      {/* Heritage Sub-Page Banner Layout matching your brand standards */}
      <header className="page-hero-banner" style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div className="page-hero-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--brand-wordmark-blue, #0d3b66)', margin: '0 0 0.5rem 0' }}>
            {t('news.page_title', 'Latest News & Events')}
          </h1>
          <p className="page-subtitle" style={{ fontSize: '1.15rem', color: '#333333', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
            {t('news.page_subtitle', 'Stay updated with upcoming meetings, resource rollouts, and local coalition announcements.')}
          </p>
        </div>
      </header>

      {/* Main Content Grid Area */}
      <main className="page-container" style={{ paddingBottom: '3rem' }}>
        <div className="vertical-stack-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
          
          {newsData && newsData.length > 0 ? (
            newsData.map((item) => (
              <article key={item.id} className="horizontal-row-card" style={{ padding: '1.5rem' }}>
                <div className="card-content-stack" style={{ gap: '0.5rem' }}>
                  
                  <header className="card-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title-highlight" style={{ fontSize: '1.25rem', margin: 0, color: 'var(--brand-wordmark-blue)' }}>
                      {item.title}
                    </h3>
                    <span className="card-meta-badge" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                      {item.date}
                    </span>
                  </header>

                  <hr className="card-divider-line" style={{ border: '0', borderTop: '1px solid var(--border-color)', margin: '0.5rem 0' }} />

                  <p className="card-description-body" style={{ margin: 0, fontSize: '1rem', lineHeight: '1.5', color: '#333333' }}>
                    {item.body}
                  </p>
                  
                </div>
              </article>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#666666', padding: '4rem 1rem' }}>
              {t('news.no_records', 'No current news or upcoming events announcements found.')}
            </div>
          )}

        </div>
      </main>
    </>
  );
}