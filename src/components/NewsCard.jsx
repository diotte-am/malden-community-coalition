import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function NewsCard({ item, currentLang = 'en' }) {
  const [copied, setCopied] = useState(false);

  // 1. Dynamic Translation Interception
  // Fall back to primary fields if language-specific keys don't exist in the JSON
  const title = item[`title_${currentLang}`] || item.title;
  const body = item[`body_${currentLang}`] || item.body;

  // 2. Self-Contained Share Action
  const handleShare = async (e) => {
    e.preventDefault();
    const shareUrl = `${window.location.origin}/news#info-${item.id}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // 3. Conditional Event Processing
  const isEvent = item.isEvent === true;

  return (
    <article 
      id={`info-${item.id}`} 
      className={`horizontal-row-card news-preview-card ${isEvent ? 'news-card-event-accent' : ''}`}
    >
      <div className="card-content-stack news-preview-stack">
        
        <header className="news-preview-header">
          <div className="news-title-block">
            {isEvent && <span className="event-indicator-pill">Event</span>}
            <h3 className="card-title-highlight news-preview-title">{title}</h3>
          </div>
          <span className="card-meta-badge news-preview-badge">{item.date}</span>
        </header>

        <p className="card-description-body news-preview-body">{body}</p>

        {/* Self-contained card action utilities layout */}
        <footer className="card-actions-row">
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