import React from 'react';
import './FilterDashboard.css';

export default function FilterDashboard({ 
  // 1. Search Inputs
  searchQuery, 
  setSearchQuery, 
  searchPlaceholder = "Search...",

  // 2. Category / Filter Inputs
  selectedCategory, 
  setSelectedCategory, 
  categories = [], // Can be strings ["Food", "Housing"] or objects [{value, label}]
  
  // 3. Layout Feature Flags
  selectorType = "dropdown", // "dropdown" or "pills"
  allCategoryLabel = "All Categories",

  // 4. Sorting Parameters
  showSort = false,
  isDescendingOrder,
  setIsDescendingOrder,
  sortNewestLabel = "↓ Newest",
  sortOldestLabel = "↑ Oldest"
}) {
  return (
    <div className="horizontal-row-card filter-dashboard-row">
      
      {/* Search Input Box Area */}
      <div className="search-field-container">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="filter-search-input"
          aria-label={searchPlaceholder}
        />
        {searchQuery && (
          <button 
            type="button" 
            className="clear-search-inline-btn"
            onClick={() => setSearchQuery('')}
            aria-label="Clear search input"
          >
            ✕
          </button>
        )}
      </div>

      {/* Conditional Sub-Engine Layout Selection */}
      {selectorType === "dropdown" ? (
        /* Dropdown Mode (Used for your existing data/resources page) */
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-category-select"
          aria-label="Filter by category"
        >
          <option value="All">{allCategoryLabel}</option>
          {categories
            .map(cat => {
              // Gracefully handle both raw string arrays and objects
              const val = typeof cat === 'object' ? cat.value : cat;
              const lbl = typeof cat === 'object' ? cat.label : cat;
              if (val === 'All') return null;
              return <option key={val} value={val}>{lbl}</option>;
            })
          }
        </select>
      ) : (
        /* Segmented Button Pills Mode (Perfect for News layout tracking!) */
        <div className="filter-pills-horizontal-group" role="group" aria-label="Filter options">
          <button
            type="button"
            className={`filter-pill-item ${selectedCategory === 'All' || selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            {allCategoryLabel}
          </button>
          {categories.map(cat => {
            const val = typeof cat === 'object' ? cat.value : cat;
            const lbl = typeof cat === 'object' ? cat.label : cat;
            if (val === 'All' || val === 'all') return null;
            return (
              <button
                key={val}
                type="button"
                className={`filter-pill-item ${selectedCategory === val ? 'active' : ''}`}
                onClick={() => setSelectedCategory(val)}
              >
                {lbl}
              </button>
            );
          })}
        </div>
      )}

      {/* Chronological Sort Control Layout */}
      {showSort && (
        <button 
          type="button"
          className="filter-sort-btn" 
          onClick={() => setIsDescendingOrder(!isDescendingOrder)}
        >
          {isDescendingOrder ? sortNewestLabel : sortOldestLabel}
        </button>
      )}

    </div>
  );
}