import React from 'react';
import { useTranslation } from 'react-i18next';
import './StaffCard.css';

export default function StaffCard({ member }) {
  const { t } = useTranslation();

  return (
    <article className="horizontal-row-card staff-member-card">
      <div className="card-content-stack">
        
        <header className="card-header-row">
          <h3 className="card-title-highlight">{member.name}</h3>
          
          {/* Dynamically query by the member's unique ID key path */}
          <span className="card-meta-badge staff-role-badge">
            {member.role}
            
          </span>
        </header>
                 <span className="card-meta-badge staff-role-badge">
            {member.pronouns && ` (${member.pronouns})`}
            
          </span>

        <hr className="card-divider-line" />

        <div className="card-body-block">
          <p className="card-description-body staff-bio-text">
            {member.bio}
          </p>
          
          {member.url && (
            <div className="card-footer-meta staff-contact-info">
              <strong>{t('common:contact_labels.website')}:</strong>{' '}
              <a href={member.url} className="nav-link resource-email-anchor">
                {member.url}
              </a>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}