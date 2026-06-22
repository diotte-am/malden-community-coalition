import React from 'react';
import ContactComponents from '../components/ContactComponents';

export default function Contact() {
  return (
    <>
      <header className="page-hero-banner">
        <div className="page-hero-content">
          <h2>Contact Us</h2>
          <p className="page-subtitle">
            Connect with us in a number of ways.
          </p>
        </div>
      </header>



      <div className="page-container">
        <ContactComponents />
      </div>
    
    </>

  );
}