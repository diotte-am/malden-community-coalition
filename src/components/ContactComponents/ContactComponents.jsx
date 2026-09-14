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
              <a href="mailto:maldencommunitycoalition@gmail.com" className="nav-link contact-email-link">
                maldencommunitycoalition@gmail.com
              </a>
            </div>

            <div>
              <h3 className="contact-item-title">Facebook Group</h3>
              <a href="https://www.facebook.com/groups/973837211343088" className="nav-link contact-email-link">
                Malden Community Coalition
              </a>
            </div>

            <div>
              <h3 className="contact-item-title">YouTube Channel</h3>
              <a href="https://www.youtube.com/@MaldenCommunityCoalition" className="nav-link contact-email-link">
                Malden Community Coalition
              </a>
            </div>
 
          </div>
        </section>

        {/* <section className="contact-cta-column" aria-label="Send a message pathway">
          <h3 className="contact-cta-title">
            Want to send a direct inquiry?
          </h3>
          <p className="card-description-body contact-cta-body">
            Use our secure online form to drop us a message regarding partnerships, volunteering, or general questions.
          </p>
          <NavLink to="/contact/message" className="btn-action-primary contact-cta-btn">
            Open Contact Form
          </NavLink>
        </section> */}

      </div>
    </main>
  );
}