import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Reusable Featured Content Section Wrapper Component
 * Eliminates repetitive layout trees, flush borders, and link actions
 */
export default function HomeFeaturedSection({ title, linkTo, linkText, children }) {
  return (
    <section aria-labelledby={`section-heading-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      {/* 
        Dynamic ID pairing with aria-labelledby delivers immediate context 
        to assistive devices without mutating structural class layouts.
      */}
      <h2 
        id={`section-heading-${title.toLowerCase().replace(/\s+/g, '-')}`} 
        className="home-section-title"
      >
        {title}
      </h2>
      
      <div className="unified-card-group">
        {children}
        
        <div className="card-flush-footer">
          <NavLink to={linkTo} className="card-flush-footer-link">
            {linkText}
          </NavLink>
        </div>
      </div>
    </section>
  );
}