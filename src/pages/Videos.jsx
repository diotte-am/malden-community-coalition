import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import VideoCard from '../components/VideoCard';
import rawVideoData from '../data/videos.json';

const videoData = rawVideoData.filter(item => item && item.id && item.youtubeId);

export default function Videos() {
  const { t, i18n } = useTranslation();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTagSearch, setActiveTagSearch] = useState(null);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  const currentLang = i18n.language || 'en';
  const descKey = `desc_${currentLang.split('-')[0]}`;

  const uniqueCategories = useMemo(() => {
    const categories = new Set(videoData.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(categories)];
  }, []);

  const processedVideos = useMemo(() => {
    let result = [...videoData];

    if (selectedCategory !== 'All') {
      result = result.filter(v => v.category === selectedCategory);
    }
    if (activeTagSearch) {
      result = result.filter(v => v.tags?.some(tag => tag.toLowerCase() === activeTagSearch.toLowerCase()));
    }

    result.sort((a, b) => {
      const dateA = a.upload_date_raw || '';
      const dateB = b.upload_date_raw || '';
      return isDescendingOrder ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    });

    return result;
  }, [selectedCategory, activeTagSearch, isDescendingOrder]);

  return (
    <div className="page-container videos-page">
      <header className="page-header">
        <h2>{t('videos.title', 'Video Series & Workshops')}</h2>
        <p className="page-subtitle">{t('videos.subtitle', 'Watch our latest community informational series.')}</p>
      </header>

      <div className="video-controls-dashboard">
        {/* <div className="control-group">
          <label htmlFor="video-category-select">{t('videos.filter_label', 'Series:')}</label>
          <select id="video-category-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>*/}
        <button className="sort-toggle-btn" onClick={() => setIsDescendingOrder(!isDescendingOrder)}>
          {isDescendingOrder ? '↓ Newest' : '↑ Oldest'}
        </button>
      </div> 

      {activeTagSearch && (
        <div className="active-filter-status" role="status">
          <span>Showing tags: <strong>#{activeTagSearch}</strong></span>
          <button className="clear-filter-btn" onClick={() => setActiveTagSearch(null)}>✕ Clear Filter</button>
        </div>
      )}

      {/* Optimized Vertical Stack List Base */}
      <div className="videos-list-vertical-stack">
        {processedVideos.map(video => (
          <VideoCard 
            key={video.id}
            video={video}
            descKey={descKey}
            activeTagSearch={activeTagSearch}
            onTagClick={(tag) => {
              if (activeTagSearch?.toLowerCase() === tag.toLowerCase()) setActiveTagSearch(null);
              else setActiveTagSearch(tag);
            }}
          />
        ))}
      </div>
    </div>
  );
}