import React from 'react';

export default function PageHero({ title, subtitle, emoji }) {
  return (
    <header className="page-hero-banner">
      <div className="page-hero-content">
        <h2>
          {title}
        </h2>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}