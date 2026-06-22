import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ResourceCard({ resource, descKey }) {
  const { t } = useTranslation();

  return (
    <article className="horizontal-row-card">
      <div className="card-content-stack">
        
        {/* Header Row: Title & Prominent Brand Orange Category */}
        <header className="card-header-row">
          <h3 className="card-title-highlight">{resource.name}</h3>
          <span className="card-meta-badge">{resource.category}</span>
        </header>

        {/* Delicate Shared Structural Divider Line */}
        <hr className="card-divider-line" />

        {/* Body and Metadata Info Area */}
        <div className="card-body-block">
          
          {/* Main Description text using localized key strings */}
          <p className="card-description-body">
            {resource[descKey] || resource.desc_en || 'No description available.'}
          </p>
          
          {/* Contact Details Footnote Layout */}
          <div className="card-footer-meta" style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {resource.poc && <div><strong>{t('resource.poc')}:</strong> {resource.poc}</div>}
            {resource.phone && <div><strong>{t('resource.phone')}:</strong> {resource.phone}</div>}
            {resource.email && (
              <div>
                <strong>{t('resource.email')}:</strong>{' '}
                <a href={`mailto:${resource.email}`} className="nav-link" style={{ display: 'inline' }}>
                  {resource.email}
                </a>
              </div>
            )}
          </div>

          {/* Action button linking out to the resource portal */}
          {resource.website && (
            <div style={{ marginTop: '0.25rem' }}>
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-action-primary"
                style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}
              >
                {t('resource.visit_website')}
              </a>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}