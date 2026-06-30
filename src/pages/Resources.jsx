import React, { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Fuse from 'fuse.js';

// Load single data storage file and child card item
import resourceData from '../data/resources.json';
import ResourceCard from '../components/ResourceCard';
import PageHero from '../components/PageHero';


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
      {/* Heritage Gradient Banner matches the team and video view exactly */}

      <PageHero 
        title={t('resources.title', 'Our Team')} 
        subtitle={t('resources.subtitle')} 
      />
      
      {/* Bounded primary site container */}
      <main className="page-container">
        
        {/* Control Panel: Form Inputs with shared styling layout */}
        <div className="horizontal-row-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <input
            type="text"
            className="form-field-group input"
            placeholder={t('resources.search_placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '250px' }}
          />

          <select
            className="control-dashboard-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '180px' }}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.filter(cat => cat !== 'All').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Clean Vertical Stack Container instead of disparate raw matrix boxes */}
        <div className="vertical-stack-container">
          {filteredResults.length > 0 ? (
            filteredResults.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} descKey={descKey} />
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#888', padding: '3rem' }}>
              {t('resources.no_results')}
            </div>
          )}
        </div>
        
      </main>
    </>
  );
}