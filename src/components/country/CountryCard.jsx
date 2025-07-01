// src/components/country/CountryCard.jsx
// Individual country card component that displays basic country information
// This replaces the createCountryCard function from your original main.js

import React from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, getCapital } from '../../services/api'

/**
 * CountryCard component displays a single country in card format
 * @param {Object} country - Country data object from the API
 * @returns {JSX.Element} Country card component
 */
const CountryCard = ({ country }) => {
  // Extract the data we need, with fallbacks for missing data
  const name = country.name.common
  const flag = country.flags.png || country.flags.svg
  const population = formatNumber(country.population)
  const region = country.region || 'Unknown'
  const capital = getCapital(country.capital)
  const countryCode = country.cca3 // 3-letter country code for navigation

  return (
    <div className="country-card">
      {/* Country flag image */}
      <div className="card-image">
        <img 
          src={flag} 
          alt={`Flag of ${name}`}
          loading="lazy" // Optimize image loading
        />
      </div>
      
      {/* Country information */}
      <div className="card-content">
        <h3 className="country-name">{name}</h3>
        
        <div className="country-details">
          <p><strong>Population:</strong> {population}</p>
          <p><strong>Region:</strong> {region}</p>
          <p><strong>Capital:</strong> {capital}</p>
        </div>
        
        {/* Link to country detail page - replaces your href="country.html?code=${country.cca3}" */}
        <Link 
          to={`/country/${countryCode}`} 
          className="view-details-btn"
          aria-label={`View details for ${name}`}
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default CountryCard