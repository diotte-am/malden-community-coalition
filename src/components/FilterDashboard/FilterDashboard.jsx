import React from 'react';

// Import our decoupled styling layouts
import './FilterDashboard.css';

export default function FilterDashboard({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories = [],
  searchPlaceholder = "Search...",
  showSort = false,
  isDescendingOrder,
  setIsDescendingOrder
}) {
  return (
    <div className="horizontal-row-card filter-dashboard-row">
      
      {/* Search Input Field */}
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="filter-search-input"
        aria-label={searchPlaceholder}
      />

      {/* Dynamic Category Selector Menu */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="filter-category-select"
        aria-label="Filter by category"
      >
        <option value="All">All Categories</option>
        {categories
          .filter(cat => cat !== 'All')
          .map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))
        }
      </select>

      {/* Optional Sort Toggle button for chronological layouts */}
      {showSort && (
        <button 
          type="button"
          className="filter-sort-btn" 
          onClick={() => setIsDescendingOrder(!isDescendingOrder)}
        >
          {isDescendingOrder ? '↓ Newest' : '↑ Oldest'}
        </button>
      )}

    </div>
  );
}