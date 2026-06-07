import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Fuse from 'fuse.js';

// Load single data storage file
import resourceData from '../data/resources.json';

export default function Resources() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams(); // 2. Add this hook handler
  
  // Default state value looks at the URL parameter if it exists
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Parse active locale token strings down to match keys inside the single file
  const currentLang = i18n.language || 'en';
  const rawBase = currentLang.split('-')[0]; // Turns 'zh-CN' or 'en-US' into 'zh' or 'en'
  const descKey = `desc_${rawBase}`;

  // Initialize and memoize Fuse.js to protect application tracking speeds
  const fuse = useMemo(() => {
    const options = {
      keys: ['name', 'category', descKey], // Directly scans the dynamically selected language column
      threshold: 0.3,                      // Typo tolerance level calibration
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
    <div className="resources-page" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>{t('resources.title')}</h2>
      <p style={{ color: '#666' }}>{t('resources.subtitle')}</p>

      {/* Control Panel: Text Search and Categories */}
      <div className="search-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={t('resources.search_placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px' }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '180px' }}
        >
          <option value="All">All Categories</option>
          {uniqueCategories.filter(cat => cat !== 'All').map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Card Interface Matrix Grid Output */}
      <div className="resources-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {filteredResults.length > 0 ? (
          filteredResults.map((resource) => (
            <div 
              key={resource.id} 
              className="resource-card" 
              style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}
            >
              <span className="category-badge" style={{ fontSize: '0.75rem', backgroundColor: '#e1f5fe', color: '#0288d1', padding: '0.25rem 0.5rem', borderRadius: '4px', fontWeight: 'bold' }}>
                {resource.category}
              </span>
              
              <h3 style={{ margin: '0.5rem 0' }}>{resource.name}</h3>
              
              {/* Dynamically extract the language property track safely with an English string fallback */}
              <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {resource[descKey] || resource.desc_en}
              </p>
              
              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '1rem 0' }} />
              
              <div className="contact-details" style={{ fontSize: '0.85rem', color: '#666', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {resource.poc && <div><strong>{t('resource.poc')}:</strong> {resource.poc}</div>}
                {resource.phone && <div><strong>{t('resource.phone')}:</strong> {resource.phone}</div>}
                {resource.email && <div><strong>{t('resource.email')}:</strong> <a href={`mailto:${resource.email}`}>{resource.email}</a></div>}
                {resource.website && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <a href={resource.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#0070f3', color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '4px', textDecoration: 'none', fontWeight: '500' }}>
                      {t('resource.visit_website')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', padding: '3rem' }}>
            {t('resources.no_results')}
          </div>
        )}
      </div>
    </div>
  );
}