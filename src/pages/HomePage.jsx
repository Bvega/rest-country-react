// src/pages/HomePage.jsx
// Main page that displays all countries with search and filter functionality
// This replaces the functionality from your original index.html + main.js

import React from 'react'
import { useCountries } from '../hooks/useCountries'
import SearchControls from '../components/country/SearchControls'
import CountryList from '../components/country/CountryList'

/**
 * HomePage component - the main country explorer page
 * This combines all the functionality from your original index.html and main.js
 * @returns {JSX.Element} Home page component
 */
const HomePage = () => {
  // Use our custom hook to get all countries data and filter functions
  // This replaces all the state management from your original main.js
  const {
    countries,           // Filtered countries to display
    isLoading,          // Loading state
    error,              // Error state
    searchQuery,        // Current search query
    selectedRegion,     // Current region filter
    availableRegions,   // All available regions for dropdown
    setSearchQuery,     // Function to update search
    setSelectedRegion,  // Function to update region filter
    totalCountries,     // Total number of countries
    filteredCount       // Number of filtered countries
  } = useCountries()

  return (
    <div className="home-page">
      {/* Page header with title */}
      <div className="page-header">
        <h2>Explore Countries Around the World</h2>
        <p>Discover information about {totalCountries} countries</p>
      </div>

      {/* Search and filter controls */}
      {/* This replaces the .controls section from your original index.html */}
      <SearchControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        availableRegions={availableRegions}
      />

      {/* Countries display area */}
      {/* This replaces the #country-list section from your original index.html */}
      <CountryList
        countries={countries}
        isLoading={isLoading}
        error={error}
        totalCount={totalCountries}
      />
      
      {/* Show filter status when filters are active */}
      {(searchQuery || selectedRegion) && !isLoading && (
        <div className="filter-status">
          <p>
            {searchQuery && `Search: "${searchQuery}"`}
            {searchQuery && selectedRegion && ' • '}
            {selectedRegion && `Region: ${selectedRegion}`}
          </p>
          <button 
            onClick={() => {
              setSearchQuery('')
              setSelectedRegion('')
            }}
            className="clear-filters-btn"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage