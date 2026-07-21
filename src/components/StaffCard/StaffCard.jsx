import React from 'react';
import { useTranslation } from 'react-i18next';
import './StaffCard.css';

export default function StaffCard({ member }) {
  const { t } = useTranslation();

  return (
    <article className="horizontal-row-card staff-member-card">
      <div className="card-content-stack">
        
        {/* Header Row: Name, Pronouns & Role Badge */}
        <header className="card-header-row">
          <div className="staff-title-group">
            <h3 className="card-title-highlight">{member.name}</h3>
            {member.pronouns && (
              <span className="card-meta-badge staff-pronoun-badge">
                ({member.pronouns})
              </span>
            )}
          </div>
          
          {member.role && (
            <span className="card-meta-badge staff-role-badge">
              {member.role}
            </span>
          )}
        </header>

        <hr className="card-divider-line" />

        {/* Body Section */}
        <div className="card-body-block">
          {/* Main Bio Text */}
          {member.bio && (
            <p className="card-description-body staff-bio-text">
              {member.bio}
            </p>
          )}

          {/* Skill / Focus Area Tags */}
          {member.skills && member.skills.length > 0 && (
            <div className="staff-card-tags">
              {member.skills.map((skill, index) => (
                <span key={index} className="staff-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Contact Details (Email & Website) */}
          {(member.email || member.url) && (
            <div className="staff-contact-row">
              {member.email && (
                <div>
                  <strong>{t('common:contact_labels.email')}:</strong>{' '}
                  <a href={`mailto:${member.email}`} className="staff-email-link">
                    {member.email}
                  </a>
                </div>
              )}

              {member.url && (
                <div>
                  <strong>{t('common:contact_labels.website')}:</strong>{' '}
                  <a 
                    href={member.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="staff-email-link"
                  >
                    {member.url}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </article>
  );
}