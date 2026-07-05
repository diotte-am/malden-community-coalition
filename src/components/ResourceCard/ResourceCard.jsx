import React from 'react';
import { useTranslation } from 'react-i18next';
import './ResourceCard.css'; 

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
            {resource[descKey] || resource.desc_en || t('common:fallbacks.no_description')}
          </p>
          
          {/* Contact Details Footnote Layout */}
          <div className="card-footer-meta resource-contact-list">
            {resource.poc && (
              <div>
                <strong>{t('common:contact_labels.poc')}:</strong> {resource.poc}
              </div>
            )}
            {resource.phone && (
              <div>
                <strong>{t('common:contact_labels.phone')}:</strong> {resource.phone}
              </div>
            )}
            {resource.email && (
              <div>
                <strong>{t('common:contact_labels.email')}:</strong>{' '}
                <a href={`mailto:${resource.email}`} className="nav-link resource-email-anchor">
                  {resource.email}
                </a>
              </div>
            )}
          </div>

          {/* Action button linking out to the resource portal */}
          {resource.website && (
            <div className="resource-action-container">
              <a 
                href={resource.website} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-action-primary resource-visit-btn"
              >
                {t('common:buttons.visit_website')}
              </a>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}