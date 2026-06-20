import React, { useState } from 'react';

export default function VideoCard({ video, descKey, onTagClick, activeTagSearch }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <article className="video-horizontal-row-card">
      {/* 1. Full-Width Structural Title Header Top Anchor */}
      <header className="video-row-header-block">
        <h3 className="video-row-title">{video.title}</h3>
       {/* <span className="video-row-category-badge">{video.category}</span> */}
      </header>

      {/* 2. Lower Media & Details Horizontal Flex Split Frame */}
      <div className="video-row-main-split">
        
        {/* Left Quadrant: Media Playback Window */}
        <div className="video-row-media-quadrant">
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
            /* Intercepting YouTube asset overhead with a static local clickable trigger layer */
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
              {/* Custom Integrated Micro Play Button overlay */}
              <div className="video-row-play-overlay-icon" aria-hidden="true"></div>
              
              {/* ⏱️ Clean Timestamp Duration badge burned into bottom corner */}
              {video.duration_display && (
                <span className="video-row-duration-timestamp-overlay">
                  {video.duration_display}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Right Quadrant: Text Documentation Details */}
        <div className="video-row-text-details-quadrant">
          <p className="video-row-description-body">
            {video[descKey] || video.desc_en || 'No description available for this catalog entry.'}
          </p>

          {/* Chronological Release Date Footer Stamp */}
          <div className="video-row-footer-meta">
            <time className="video-row-date-stamp" dateTime={video.upload_date_display}>
              📅 Released: {video.upload_date_display || 'Unknown Date'}
            </time>
          </div>

          {/* Interactive Tag Cluster List */}
          {video.tags && video.tags.length > 0 && (
            <div className="video-row-tag-cluster" aria-label="Related topic filters">
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
    </article>
  );
}                 