import React from 'react';
import { NavLink } from 'react-router-dom';
/**
 * Reusable Featured Content Section Wrapper Component
 * Eliminates repetitive layout trees, flush borders, and link actions
 */
export default function HomeFeaturedSection({ title, linkTo, linkText, children }) {
  return (
    <section>
      <h2 className="home-section-title">{title}</h2>
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