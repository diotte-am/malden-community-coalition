import React, { useState } from 'react';
import './VideoCard.css'; // <-- Added direct scoped style binding

export default function VideoCard({ video, descKey, onTagClick, activeTagSearch }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="horizontal-row-card">
      <div className="card-content-stack"> 

        <header className="card-header-row">
          <h3 className="card-title-highlight">{video.title}</h3>
          <span className="card-meta-badge">{video.category}</span>
        </header>

        <hr className="card-divider-line" />

        {/* Lower Media & Details Horizontal Flex Split Frame */}
        <div className="card-main-split">
          
          {/* Left Quadrant: Dedicated Media Window class */}
          <div className="card-media-window-frame">
            {isPlaying ? (
              <div className="video-row-embed-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <button 
                className="video-row-thumbnail-trigger-btn"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play video: ${video.title}`}
              >
                <img 
                  src={video.thumbnail_maxres || `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} 
                  alt="" 
                  className="video-row-img-canvas"
                  loading="lazy"
                />
                <div className="video-row-play-overlay-icon" aria-hidden="true"></div>
                
                {video.duration_display && (
                  <span className="video-row-duration-timestamp-overlay">
                    {video.duration_display}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Right Quadrant: Text Documentation Details with explicit internal gap styling */}
          <div className="card-text-details-quadrant">
            <p className="card-description-body">
              {video[descKey] || video.desc_en || 'No description available for this catalog entry.'}
            </p>

            <div className="card-footer-meta">
              <time className="video-row-date-stamp" dateTime={video.upload_date_display}>
                {video.upload_date_display || ''}
              </time>
            </div>

            {/* RESTORED: Styled cleanly with scoped classes instead of inline rule blocks */}
            <div className="video-card-action-row">
              <a 
                href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-action-primary video-card-youtube-btn"
              >
                Watch on YouTube ↗
              </a>
            </div>
          </div>

        </div>

        {/* MOVED: Spans the entire width below the split frame panels */}
        {video.tags && video.tags.length > 0 && (
          <div className="card-tag-cluster video-card-full-width-tags" aria-label="Related topic filters">
            {video.tags.map(tag => {
              const isSelected = activeTagSearch?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  className={`tag-pill-btn ${isSelected ? 'active-tag' : ''}`}
                  onClick={() => onTagClick(tag)}
                  aria-pressed={isSelected}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </article>
  );
}