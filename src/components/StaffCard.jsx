import React from 'react';

export default function StaffCard({ member }) {
  return (
    <article className="horizontal-row-card">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        
        {/* Name & Title Header Row */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem 1rem' }}>
          <h3 className="card-row-title" style={{ color: 'var(--brand-wordmark-blue)' }}>
            {member.name}
          </h3>
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--brand-logo-orange)' }}>
            {member.role}
          </span>
        </header>

        {/* Structural Break Line matching global card dividers */}
        <hr style={{ border: 0, borderBottom: '1px solid var(--border-color)', margin: '0.5rem 0 1rem 0' }} />

        {/* Body & Meta Details Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <p className="card-description-body">
            {member.bio}
          </p>
          
          {/* Reusing video-row-date-stamp styles inline for unified alignment */}
          <div className="card-footer-meta">
            ✉️ Contact: <a href={`mailto:${member.email}`} className="nav-link" style={{ display: 'inline', color: 'var(--primary-color)' }}>{member.email}</a>
          </div>

          {/* Reusing Global Filter Tag Layout for Core Skills/Focus areas */}
          <div className="card-tag-cluster">
            {member.tags.map((tag, index) => (
              <span key={index} className="tag-pill-btn" style={{ cursor: 'default' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}