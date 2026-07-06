import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeFeaturedSection.css'

export default function HomeFeaturedSection({ title, linkTo, linkText, children }) {
  const sectionId = `section-heading-${title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <section aria-labelledby={sectionId} className="home-featured-card-wrapper">
      <header className="featured-card-header">
        <h2 id={sectionId} className="home-section-title">
          {title}
        </h2>
      </header>
      
      <div className="featured-card-body">
        {children}
      </div>
        
      <footer className="card-flush-footer">
        <NavLink to={linkTo} className="card-flush-footer-link">
          {linkText}
        </NavLink>
      </footer>
    </section>
  );
}