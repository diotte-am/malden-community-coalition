import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NewsCard.css';

export default function NewsCard({ item, currentLang = 'en' }) {
  const [copied, setCopied] = useState(false);

  // 1. Dynamic Translation Interception
  const title = item[`title_${currentLang}`] || item.title;
  
  // 2. Dynamic Text Snippet Extraction from the new bodyBlocks array
  let body = item[`body_${currentLang}`] || item.body;
  if (!body && item.bodyBlocks) {
    // Falls back to find the first text block if a raw body parameter doesn't exist
    const firstTextBlock = item.bodyBlocks.find(block => block.type === 'text');
    body = firstTextBlock ? firstTextBlock.content : '';
  }

  // Truncate text block gracefully for preview cards if it's super long
  const truncatedBody = body && body.length > 220 
    ? body.slice(0, 220) + '...' 
    : body;

  // 3. Self-Contained Share Action
  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents clicking share from triggering link navigations
    const shareUrl = `${window.location.origin}/news/${item.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const isEvent = item.isEvent === true;

  return (
    <article 
      id={`info-${item.id}`} 
      className={`horizontal-row-card news-preview-card ${isEvent ? 'news-card-event-accent' : ''}`}
    >
      {/* Thumbnail Frame (Added without breaking semantic stacks) */}
      {item.heroImage && (
        <Link to={`/news/${item.id}`} className="news-card-image-link" aria-hidden="true" tabIndex="-1">
          <div className="news-card-image-wrapper">
            <img 
              src={item.heroImage.src} 
              alt={item.heroImage.alt || title} 
              className="news-card-thumbnail"
              loading="lazy"
            />
          </div>
        </Link>
      )}

      <div className="card-content-stack news-preview-stack">
        <header className="news-preview-header">
          <div className="news-title-block">
            {isEvent && <span className="event-indicator-pill">Event</span>}
            <h3 className="card-title-highlight news-preview-title">
              <Link to={`/news/${item.id}`} className="news-title-routing-link">
                {title}
              </Link>
            </h3>
          </div>
          <span className="card-meta-badge news-preview-badge">{item.date}</span>
        </header>

        <p className="card-description-body news-preview-body">{truncatedBody}</p>

        <footer className="card-actions-row">
          <Link to={`/news/${item.id}`} className="news-read-more-action">
            Read full article →
          </Link>
          
          <button 
            onClick={handleShare} 
            className={`btn-utility-share ${copied ? 'copied' : ''}`}
            aria-label="Copy link to this announcement"
          >
            {copied ? '✓ Link Copied!' : '🔗 Share'}
          </button>
        </footer>
      </div>
    </article>
  );
}