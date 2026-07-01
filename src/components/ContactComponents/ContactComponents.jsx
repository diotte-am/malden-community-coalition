import React from 'react';
import { NavLink } from 'react-router-dom';

// Import our newly isolated layout rules
import './ContactComponents.css';

export default function ContactComponents() {
  return (
    <main className="page-container">
      <div className="layout-split-twocol">
        
        {/* Left Column: Essential Contact Details */}
        <section className="contact-details-column" aria-label="Contact Details">
          <h2 className="contact-heading-main">
            Get in Touch
          </h2>
          <p className="card-description-body">
            Have questions about upcoming programs, coalition meetings, or community advocacy? 
            Reach out to our team directly.
          </p>
          
          <div className="contact-info-list">
            <div>
              <h3 className="contact-item-title">Email Address</h3>
              <a href="mailto:info@maldencommunitycoalition.org" className="nav-link contact-email-link">
                info@maldencommunitycoalition.org
              </a>
            </div>

            <div>
              <h3 className="contact-item-title">Office Hours</h3>
              <p className="card-footer-meta contact-hours-text">
                Monday – Friday: 9:00 AM – 5:00 PM
              </p>
            </div>
          </div>
        </section>

        {/* Right Column: Clean Link/Call to Action to Send a Message */}
        <section className="contact-cta-column" aria-label="Send a message pathway">
          <h3 className="contact-cta-title">
            Want to send a direct inquiry?
          </h3>
          <p className="card-description-body contact-cta-body">
            Use our secure online form to drop us a message regarding partnerships, volunteering, or general questions.
          </p>
          <NavLink to="/contact/message" className="btn-action-primary contact-cta-btn">
            Open Contact Form
          </NavLink>
        </section>

      </div>
    </main>
  );
}