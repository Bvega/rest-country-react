// src/components/country/SearchControls.jsx
// Component that combines search input and region filter
// This replaces the controls section from your original index.html

import React from 'react'
import SearchInput from '../ui/SearchInput'
import RegionFilter from '../ui/RegionFilter'

/**
 * SearchControls component combines search and filter functionality
 * @param {string} searchQuery - Current search query
 * @param {Function} onSearchChange - Function to handle search input changes
 * @param {string} selectedRegion - Currently selected region
 * @param {Function} onRegionChange - Function to handle region selection changes
 * @param {Array} availableRegions - Array of available regions for filtering
 * @returns {JSX.Element} Search controls component
 */
const SearchControls = ({ 
  searchQuery, 
  onSearchChange, 
  selectedRegion, 
  onRegionChange, 
  availableRegions 
}) => {
  return (
    <div className="search-controls">
      {/* Search input - replaces your input#search */}
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search for a country..."
      />
      
      {/* Region filter - replaces your select#region-filter */}
      <RegionFilter
        value={selectedRegion}
        onChange={onRegionChange}
        regions={availableRegions}
      />
    </div>
  )
}

export default SearchControls