import React from 'react';

export default function StaffCard({ member }) {
  return (
    <article className="horizontal-row-card">
      <div className='card-content-stack'>
        
        {/* Name & Title Header Row */}
        <header className='card-header-row'>
          <h3 className="card-title-highlight">{member.name}</h3>
          <span className='card-meta-badge'>{member.role}</span>
        </header>

        {/* Structural Break Line matching global card dividers */}
        <hr className='card-divider-line' />

        {/* Body & Meta Details Block */}
        <div className='card-body-block'>
          <p className="card-description-body">{member.bio}</p>
          
          {/* Reusing video-row-date-stamp styles inline for unified alignment */}
          <div className="card-footer-meta">
            Contact: <a href={`mailto:${member.email}`} className="nav-link" style={{ display: 'inline', color: 'var(--primary-color)' }}>{member.email}</a>
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