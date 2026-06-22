import React from 'react';

export default function FilterDashboard({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  categories,
  searchPlaceholder = "Search...",
  showSort = false,
  isDescendingOrder,
  setIsDescendingOrder
}) {
  return (
    <div className="horizontal-row-card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
      
      {/* Search Input Field */}
      <input
        type="text"
        placeholder={searchPlaceholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '250px' }}
      />

      {/* Dynamic Category Selector Menu */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', minWidth: '180px', backgroundColor: '#fff', cursor: 'pointer' }}
      >
        <option value="All">All Categories</option>
        {categories.filter(cat => cat !== 'All').map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Optional Sort Toggle button for chronological layouts */}
      {showSort && (
        <button 
          className="sort-toggle-btn" 
          onClick={() => setIsDescendingOrder(!isDescendingOrder)}
          style={{ padding: '0.75rem 1.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--card-bg, #fff)', cursor: 'pointer', fontWeight: 600 }}
        >
          {isDescendingOrder ? '↓ Newest' : '↑ Oldest'}
        </button>
      )}

    </div>
  );
}