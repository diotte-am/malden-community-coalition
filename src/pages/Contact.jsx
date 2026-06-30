import React from 'react';
import ContactComponents from '../components/ContactComponents';
import PageHero from '../components/PageHero';

export default function Contact() {
  return (
    <>
      <PageHero 
        title={t('contact.page_title', 'Contact Us')} 
        subtitle={t('contact.page_subtitle', 'Connect with us in a number of ways.')} 
      />
      
      <div className="page-container">
        <ContactComponents />
      </div>
    </>
  );
}