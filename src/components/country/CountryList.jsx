// src/components/country/CountryList.jsx
// Component that renders a grid of country cards
// This replaces the renderCountries function from your original main.js

import React from 'react'
import CountryCard from './CountryCard'
import LoadingSpinner from '../ui/LoadingSpinner'

/**
 * CountryList component renders a grid of country cards
 * @param {Array} countries - Array of country objects to display
 * @param {boolean} isLoading - Loading state
 * @param {string} error - Error message if any
 * @param {number} totalCount - Total number of countries available
 * @returns {JSX.Element} Country list component
 */
const CountryList = ({ countries, isLoading, error, totalCount }) => {
  // Show loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner message="Loading countries..." />
  }

  // Show error message if something went wrong
  if (error) {
    return (
      <div className="error-message">
        <h3>❌ Error Loading Countries</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    )
  }

  // Show message if no countries match the current filters
  if (!countries || countries.length === 0) {
    return (
      <div className="no-results">
        <h3>🔍 No Countries Found</h3>
        <p>Try adjusting your search or filter criteria.</p>
        <p>Total countries available: {totalCount}</p>
      </div>
    )
  }

  // Render the grid of country cards
  return (
    <div className="countries-container">
      {/* Results info */}
      <div className="results-info">
        <p>Showing {countries.length} of {totalCount} countries</p>
      </div>
      
      {/* Country cards grid - replaces your .grid class */}
      <div className="countries-grid">
        {countries.map((country) => (
          <CountryCard 
            key={country.cca3} // Use country code as unique key
            country={country}
          />
        ))}
      </div>
    </div>
  )
}

export default CountryList