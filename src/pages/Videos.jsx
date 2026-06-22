import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import VideoCard from '../components/VideoCard';
import FilterDashboard from '../components/FilterDashboard'; // 1. IMPORT THE NEW DASHBOARD
import rawVideoData from '../data/videos.json';

const videoData = rawVideoData.filter(item => item && item.id && item.youtubeId);

export default function Videos() {
  const { t, i18n } = useTranslation();
  
  // Local state controls
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTagSearch, setActiveTagSearch] = useState(null);
  const [isDescendingOrder, setIsDescendingOrder] = useState(true);

  const currentLang = i18n.language || 'en';
  const descKey = `desc_${currentLang.split('-')[0]}`;

  // Assemble dynamic category lists
  const uniqueCategories = useMemo(() => {
    const categories = new Set(videoData.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(categories)];
  }, []);

  // Execute unified text and category search filters
  const processedVideos = useMemo(() => {
    let result = [...videoData];

    // Text query processing
    if (searchQuery.trim() !== '') {
      result = result.filter(v => 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (v[descKey] || v.desc_en || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category processing
    if (selectedCategory !== 'All') {
      result = result.filter(v => v.category === selectedCategory);
    }

    // Tag block processing
    if (activeTagSearch) {
      result = result.filter(v => v.tags?.some(tag => tag.toLowerCase() === activeTagSearch.toLowerCase()));
    }

    // Sort evaluation
    result.sort((a, b) => {
      const dateA = a.upload_date_raw || '';
      const dateB = b.upload_date_raw || '';
      return isDescendingOrder ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB);
    });

    return result;
  }, [searchQuery, selectedCategory, activeTagSearch, isDescendingOrder, descKey]);

  return (
    <>
      {/* Full-Width Heritage Gradient Banner */}
      <header className="page-hero-banner">
        <div className="page-hero-content">
          <h2>Community Video Library</h2>
          <p className="page-subtitle">
            Explore workshops, recorded coalition meetings, and advocacy resources.
          </p>
        </div>
      </header>

      <main className="page-container">
        
        {/* 2. REUSABLE SYSTEM CONTROLS DASHBOARD */}
        <FilterDashboard 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={uniqueCategories}
          searchPlaceholder={t('videos.search_placeholder', 'Search videos...')}
          showSort={true}
          isDescendingOrder={isDescendingOrder}
          setIsDescendingOrder={setIsDescendingOrder}
        />

        {/* Active Tag Highlight Status Strip */}
        {activeTagSearch && (
          <div className="active-filter-status" role="status" style={{ marginBottom: '1.5rem' }}>
            <span>Showing tags: <strong>#{activeTagSearch}</strong></span>
            <button className="clear-filter-btn" onClick={() => setActiveTagSearch(null)}>✕ Clear Filter</button>
          </div>
        )}

        {/* Organized Vertical Stack Layout */}
        <div className="vertical-stack-container">
          {processedVideos.length > 0 ? (
            processedVideos.map(video => (
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
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
              No videos match your search criteria.
            </div>
          )}
        </div>
      </main>
    </>
  );
}