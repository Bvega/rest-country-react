// src/components/ui/SearchInput.jsx
// Reusable search input component
// This replaces the search input functionality from your original HTML

import React from 'react'

const SearchInput = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <div className="search-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-field"
      />
    </div>
  )
}

export default SearchInput