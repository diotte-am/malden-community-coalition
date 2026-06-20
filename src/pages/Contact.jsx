import React from 'react';
import { useTranslation } from 'react-i18next';
import { ContactChannels, ContactForm } from '../components/ContactComponents';

export default function Contact() {
  const { t } = useTranslation();
  
  return (
    <div className="page-container contact-page">
      <header className="page-header">
        <h2>{t('contact.title', 'Get in Touch')}</h2>
        <p className="page-subtitle">
          {t('contact.subtitle', 'Have questions, want to coordinate resources, or join our organizing efforts? Reach out online.')}
        </p>
      </header>

      <div className="contact-split-layout">
        {/* Pass your target email as a single prop configuration variable */}
        <ContactChannels email="maldencommunitycoalition@gmail.com" />
        <ContactForm />
      </div>
    </div>
  );
}