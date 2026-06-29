import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ContactComponents() {
  return (
    <main className="page-container">
      <div className="layout-split-twocol">
        
        {/* Left Column: Essential Contact Details */}
        <section className="contact-details-column" aria-label="Contact Details">
          <h2 style={{ fontSize: '1.8rem', marginTop: 0, color: 'var(--brand-wordmark-blue)' }}>
            Get in Touch
          </h2>
          <p className="card-description-body">
            Have questions about upcoming programs, coalition meetings, or community advocacy? 
            Reach out to our team directly.
          </p>
          
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', fontWeight: 600 }}>Email Address</h3>
              <a href="mailto:info@maldencommunitycoalition.org" className="nav-link" style={{ color: 'var(--primary-color)' }}>
                info@maldencommunitycoalition.org
              </a>
            </div>

            <div>
              <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0', fontWeight: 600 }}>Office Hours</h3>
              <p className="card-footer-meta" style={{ margin: 0 }}>
                Monday – Friday: 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Clean Link/Call to Action to Send a Message */}
        <section 
          className="contact-cta-column" 
          aria-label="Send a message pathway" 
          style={{ 
            backgroundColor: 'var(--card-bg)', 
            border: '1px solid var(--border-color)', 
            padding: '2rem', 
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '1rem'
          }}
        >
          <h3 style={{ fontSize: '1.4rem', margin: 0, fontWeight: 700 }}>
            Want to send a direct inquiry?
          </h3>
          <p className="card-description-body" style={{ color: 'var(--text-muted)' }}>
            Use our secure online form to drop us a message regarding partnerships, volunteering, or general questions.
          </p>
          <NavLink to="/contact/message" className="btn-action-primary" style={{ textDecoration: 'none' }}>
            Open Contact Form
          </NavLink>
        </section>

      </div>
    </main>
  );
}