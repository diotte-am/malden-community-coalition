import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';

// 1. Direct local scoped style binding
import './Resources.css';

// 2. Load single data storage file
import resourceData from '../../data/resources.json';

// 3. Import component folders using clean index barrel paths
import ResourceCard from '../../components/ResourceCard';
import PageHero from '../../components/PageHero';

export default function Resources() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Capture incoming home page redirect query exactly once
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);
  
  // Parse active locale token strings down to match language keys inside JSON
  const currentLang = i18n.language || 'en';
  const rawBase = currentLang.split('-')[0];
  const descKey = `desc_${rawBase}`;

  // Initialize and memoize Fuse.js search settings
  const fuse = useMemo(() => {
    const options = {
      keys: ['name', 'category', descKey],
      threshold: 0.3,
      ignoreLocation: true
    };
    return new Fuse(resourceData, options);
  }, [descKey]);

  // Execute continuous conditional filtering pipelines
  const filteredResults = useMemo(() => {
    let results = resourceData;

    if (searchQuery.trim() !== '') {
      results = fuse.search(searchQuery).map(result => result.item);
    }

    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }

    return results;
  }, [searchQuery, selectedCategory, fuse]);

  // Dynamically assemble drop-down filter menus from data rows
  const uniqueCategories = useMemo(() => {
    const categories = new Set(resourceData.map(item => item.category).filter(Boolean));
    return ['All', ...Array.from(categories)];
  }, []);

  return (
    <>
      <PageHero 
        title={t('resources.title', 'Our Team')} 
        subtitle={t('resources.subtitle')} 
      />
      
      {/* Bounded primary site container */}
      <main className="page-container">
        
        {/* Control Panel: Form Inputs styled with clean local classes */}
        <div className="horizontal-row-card resources-control-panel">
          <input
            type="text"
            className="form-field-group input resources-search-input"
            placeholder={t('resources.search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="control-dashboard-select resources-category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.filter(cat => cat !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Clean Vertical Stack Container */}
        <div className="vertical-stack-container">
          {filteredResults.length > 0 ? (
            filteredResults.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} descKey={descKey} />
            ))
          ) : (
            <div className="resources-empty-state">
              {t('resources.no_results')}
            </div>
          )}
        </div>
        
      </main>
    </>
  );
}