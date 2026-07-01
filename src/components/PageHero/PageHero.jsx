import React from 'react';
import './PageHero.css'; // <-- Tells Vite to bind these structural styles directly here!

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