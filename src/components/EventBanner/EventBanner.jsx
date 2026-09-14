import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './EventBanner.css';

export default function EventBanner({ 
  imageSrc, 
  altText = "Upcoming Event Poster", 
  articleUrl = null,
  title = null
}) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling while modal is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <section className="event-banner-wrapper">
        <div className="event-banner-card">
          
          {/* Header Row */}
          <div className="event-banner-header">
            <span className="event-banner-badge">
              📢 {t('common:labels.upcoming_event', 'Upcoming Event')}
            </span>
            <span className="event-zoom-hint">
              🔍 {t('common:labels.click_to_enlarge', 'Click image to enlarge')}
            </span>
          </div>

          {title && <h2 className="event-banner-title">{title}</h2>}

          {/* Clickable Poster Image */}
          <button 
            type="button" 
            className="event-poster-container"
            onClick={() => setIsModalOpen(true)}
            aria-label={t('common:actions.open_full_image', 'Open full size poster')}
          >
            <img 
              src={imageSrc} 
              alt={altText} 
              className="event-poster-img" 
            />
          </button>

          {/* Optional External/Internal Article Link */}
          {articleUrl && (
            <div className="event-banner-action">
              <a 
                href={articleUrl} 
                className="btn-action-primary event-link-btn"
                target={articleUrl.startsWith('http') ? "_blank" : "_self"}
                rel={articleUrl.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                {t('common:buttons.learn_more', 'Read News Article')} →
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Full-Size Poster Modal Lightbox */}
      {isModalOpen && (
        <div 
          className="event-modal-backdrop" 
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="event-modal-content" 
            onClick={(e) => e.stopPropagation()} /* Prevents closing when clicking image itself */
          >
            <button 
              type="button" 
              className="event-modal-close-btn" 
              onClick={() => setIsModalOpen(false)}
              aria-label={t('common:actions.close', 'Close full size view')}
            >
              ✕
            </button>
            <img 
              src={imageSrc} 
              alt={altText} 
              className="event-modal-full-img" 
            />
          </div>
        </div>
      )}
    </>
  );
}