import React, { useState } from 'react';

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

        {/* Managed responsively by global flex split layout definitions */}
        <div className="card-main-split">
          
          {/* Left Quadrant: Media Playback Window */}
          <div className="card-body-block">
            {isPlaying ? (
              <div className="video-row-embed-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
                  title={video.title}
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

          {/* Right Quadrant: Text Documentation Details */}
          <div className="card-text-details-quadrant">
            <p className="card-description-body">
              {video[descKey] || video.desc_en || 'No description available for this catalog entry.'}
            </p>

            <div className="card-footer-meta">
              <time dateTime={video.upload_date_display}>
                {video.upload_date_display || ''}
              </time>
            </div>

            {video.tags && video.tags.length > 0 && (
              <div className="card-tag-cluster" aria-label="Related topic filters">
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

        </div>
      </div>
    </article>
  );
}