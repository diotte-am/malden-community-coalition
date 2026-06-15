import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import rawVideoData from '../data/videos.json';

// Sanitation layer to strip out trailing empty lines or incomplete data rows
const videoData = rawVideoData.filter(item => item && item.id && item.youtubeId);

export default function Videos() {
  const { t, i18n } = useTranslation();
  
  // State Matrix
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTagSearch, setActiveTagSearch] = useState(null);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  // Parse locale profile to load matching description key fields ('desc_en', 'desc_es', etc.)
  const currentLang = i18n.language || 'en';
  const descKey = `desc_${currentLang.split('-')[0]}`;

  // 1. Dynamically extract all distinct categories for dropdown filtering tabs
  const uniqueCategories = useMemo(() => {
    const categories = new Set(videoData.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(categories)];
  }, []);

  // 2. Filter & Sort Matrix
  const processedVideos = useMemo(() => {
    let result = [...videoData];

    // Filter Step A: Filter by Dropdown Category Selection
    if (selectedCategory !== 'All') {
      result = result.filter(video => video.category === selectedCategory);
    }

    // Filter Step B: Filter by Active Clicked Tag
    if (activeTagSearch) {
      result = result.filter(video => 
        video.tags && video.tags.some(tag => tag.toLowerCase() === activeTagSearch.toLowerCase())
      );
    }

    // Sort Step C: Re-order based on structural chronological date stamps
    result.sort((a, b) => {
      const dateA = a.upload_date_raw || '';
      const dateB = b.upload_date_raw || '';
      return isDescendingOrder ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    });

    return result;
  }, [selectedCategory, activeTagSearch, isDescendingOrder]);

  // Handle setting/unsetting clicked tags
  const handleTagClick = (tag) => {
    if (activeTagSearch?.toLowerCase() === tag.toLowerCase()) {
      setActiveTagSearch(null); // Clear search if clicking the active filter tag again
    } else {
      setActiveTagSearch(tag);
    }
  };

  return (
    <div className="videos-page">
      <header className="page-header">
        <h2>{t('videos.title', 'Video Series & Workshops')}</h2>
        <p className="page-subtitle">
          {t('videos.subtitle', 'Watch our latest community informational series, instructional guides, and recorded panels.')}
        </p>
      </header>

      {/* Control Dashboard Panel */}
      <div className="video-controls-dashboard">
        {/* Category Dropdown */}
        <div className="control-group">
          <label htmlFor="video-category-select">{t('videos.filter_label', 'Series Category:')}</label>
          <select 
            id="video-category-select"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Date Sorting Toggle Button */}
        <button 
          className="sort-toggle-btn"
          onClick={() => setIsDescendingOrder(!isDescendingOrder)}
          aria-label={isDescendingOrder ? "Sort older to newer" : "Sort newer to older"}
        >
          {isDescendingOrder ? '📅 ↓ Newest First' : '📅 ↑ Oldest First'}
        </button>
      </div>

      {/* Active Filter Alert Banner */}
      {activeTagSearch && (
        <div className="active-filter-status" role="status">
          <span>
            Showing videos tagged with: <strong>#{activeTagSearch}</strong>
          </span>
          <button 
            className="clear-filter-btn" 
            onClick={() => setActiveTagSearch(null)}
            aria-label="Clear active tag filter"
          >
            ✕ Clear Tag Filter
          </button>
        </div>
      )}

      {/* Empty State Handler */}
      {processedVideos.length === 0 && (
        <div className="empty-results-fallback">
          <p>No videos found matching your active filter configuration matrix.</p>
          <button onClick={() => { setSelectedCategory('All'); setActiveTagSearch(null); }}>
            Reset Filters
          </button>
        </div>
      )}

      {/* Video Cards Grid */}
      <div className="videos-grid">
        {processedVideos.map((video) => (
          <article key={video.id} className="video-card">
            
            {/* 16:9 Aspect Ratio Responsive Embed Frame */}
            <div className="video-embed-container">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            
            {/* Metadata and Details Body */}
            <div className="video-card-body">
              <div className="video-card-meta-row">
                <span className="category-badge">{video.category}</span>
                {video.duration_display && (
                  <span className="duration-badge">⏱️ {video.duration_display}</span>
                )}
              </div>

              <h3>{video.title}</h3>
              
              <p className="upload-date-stamp">
                Released: {video.upload_date_display || 'Unknown Date'}
              </p>

              <p className="video-desc">
                {video[descKey] || video.desc_en || 'No description available.'}
              </p>

              {/* Dynamic Tag Track Cluster */}
              {video.tags && video.tags.length > 0 && (
                <div className="video-tag-cluster" aria-label="Video related topic tags">
                  {video.tags.map(tag => {
                    const isActive = activeTagSearch?.toLowerCase() === tag.toLowerCase();
                    return (
                      <button
                        key={tag}
                        className={`tag-pill-btn ${isActive ? 'active-tag' : ''}`}
                        onClick={() => handleTagClick(tag)}
                        aria-pressed={isActive}
                      >
                        #{tag}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </article>
        ))}
      </div>
    </div>
  );
}