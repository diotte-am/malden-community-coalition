import React, { useState } from 'react';

// Import our newly isolated layout and layout box rules
import './ContactFormPage.css';

export default function ContactFormPage() {
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form handling logic goes here
    setStatus('success');
  };

  return (
    <main className="page-container contact-form-container">
      <section className="contact-form-column" aria-label="Send a message">
        <h2 className="contact-form-heading">
          Send a Message
        </h2>
        <p className="card-description-body contact-form-subtitle">
          Fill out the fields below, and a coalition representative will respond within 2 business days.
        </p>

        {status === 'success' && (
          <div className="status-alert-box success" role="alert">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-message-form">
          <div className="form-field-group">
            <label htmlFor="user-name">Full Name</label>
            <input type="text" id="user-name" required placeholder="Your name" />
          </div>

          <div className="form-field-group">
            <label htmlFor="user-email">Email Address</label>
            <input type="email" id="user-email" required placeholder="your.email@example.com" />
          </div>

          <div className="form-field-group">
            <label htmlFor="message-body">Message</label>
            <textarea id="message-body" rows="6" required placeholder="How can we help you?"></textarea>
          </div>

          <div className="form-submit-wrapper">
            <button type="submit" className="btn-action-primary">
              Submit Message
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}