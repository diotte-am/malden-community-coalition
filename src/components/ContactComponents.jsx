import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// 1. Reusable Social Link Chip
export function SocialLink({ href, icon, label }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="social-link-item"
    >
      <span>{icon}</span> {label}
    </a>
  );
}

// 2. Direct Communications & Channels Column
export function ContactChannels({ email }) {
  const { t } = useTranslation();

  return (
    <section className="contact-details-column" aria-label="Digital Channels">
      <div className="info-card-block">
        <h3>{t('contact.comms_heading', 'Direct Contact')}</h3>
        <p>
          📧 <strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>

      {/* Discord Teaser Card */}
      <div className="info-card-block discord-teaser-box">
        <h3>💬 {t('contact.discord_heading', 'Community Discord')}</h3>
        <p className="discord-status-text">
          <em>{t('contact.discord_teaser', 'Our community chat server is currently in development! Check back soon for an open invite link.')}</em>
        </p>
      </div>

      {/* Social Media Link Hub */}
      <div className="info-card-block">
        <h3>📱 {t('contact.socials_heading', 'Follow Our Updates')}</h3>
        <div className="social-links-container">
          <SocialLink href="https://instagram.com" icon="📸" label="Instagram" />
          <SocialLink href="https://facebook.com" icon="👥" label="Facebook" />
          <SocialLink href="https://youtube.com" icon="🎥" label="YouTube Channel" />
        </div>
      </div>
    </section>
  );
}

// 3. Isolated Form Handler Box Component
export function ContactForm() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState({ type: null, text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: 'error',
        text: t('contact.error_missing', 'Please fill out all fields before submitting.')
      });
      return;
    }

    setFormStatus({
      type: 'success',
      text: t('contact.success_message', 'Thank you! Your message has been sent to the coalition team.')
    });
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-form-column" aria-label="Send a message">
      <form onSubmit={handleSubmit} className="polished-contact-form" noValidate>
        {formStatus.text && (
          <div className={`form-status-banner ${formStatus.type}`} role="alert" aria-live="polite">
            {formStatus.text}
          </div>
        )}

        <div className="form-field-group">
          <label htmlFor="contact-name">{t('contact.form_name', 'Your Name')}</label>
          <input type="text" id="contact-name" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>

        <div className="form-field-group">
          <label htmlFor="contact-email">{t('contact.form_email', 'Email Address')}</label>
          <input type="email" id="contact-email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>

        <div className="form-field-group">
          <label htmlFor="contact-message">{t('contact.form_message', 'How can we help you?')}</label>
          <textarea id="contact-message" name="message" rows="6" value={formData.message} onChange={handleInputChange} required></textarea>
        </div>

        <button type="submit" className="form-submit-action-btn">
          {t('contact.form_submit_btn', 'Send Message')}
        </button>
      </form>
    </section>
  );
}