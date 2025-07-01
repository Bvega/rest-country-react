// src/pages/CountryDetailPage.jsx
// Country detail page that displays comprehensive information for a specific country
// This replaces the functionality from your original country.html + country.js

import React from 'react'
import { useParams } from 'react-router-dom'
import { useCountryDetail } from '../hooks/useCountryDetail'
import CountryDetail from '../components/country/CountryDetail'
import BackButton from '../components/ui/BackButton'
import LoadingSpinner from '../components/ui/LoadingSpinner'

/**
 * CountryDetailPage component - displays detailed information for a specific country
 * This replaces all the functionality from your original country.html and country.js
 * @returns {JSX.Element} Country detail page component
 */
const CountryDetailPage = () => {
  // Get the country code from the URL parameter
  // This replaces: const params = new URLSearchParams(window.location.search); const code = params.get('code');
  const { code } = useParams()

  // Use our custom hook to get country data
  // This replaces all the API fetching logic from your original country.js
  const {
    country,           // Main country data
    borderCountries,   // Array of border countries
    isLoading,         // Loading state for main country
    isBordersLoading,  // Loading state for border countries
    error,             // Error state
    isValidCountry     // Boolean indicating if country data is valid
  } = useCountryDetail(code)

  // Show loading spinner while fetching country data
  if (isLoading) {
    return (
      <div className="country-detail-page">
        <BackButton />
        <LoadingSpinner message={`Loading details for ${code}...`} />
      </div>
    )
  }

  // Show error message if country not found or other error occurred
  if (error || !isValidCountry) {
    return (
      <div className="country-detail-page">
        <BackButton />
        <div className="error-message">
          <h2>❌ Country Not Found</h2>
          <p>{error || `Could not find country with code: ${code}`}</p>
          <p>Please check the country code and try again.</p>
        </div>
      </div>
    )
  }

  // Show country details when data is successfully loaded
  return (
    <div className="country-detail-page">
      {/* Back button for navigation */}
      <BackButton />
      
      {/* Main country detail component */}
      <CountryDetail 
        country={country}
        borderCountries={borderCountries}
        isBordersLoading={isBordersLoading}
      />
    </div>
  )
}

export default CountryDetailPage