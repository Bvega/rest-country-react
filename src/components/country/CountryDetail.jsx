// src/components/country/CountryDetail.jsx
// Component that displays detailed information for a single country
// This replaces the renderCountryDetails function from your original country.js

import React from 'react'
import { Link } from 'react-router-dom'
import { 
  formatNumber, 
  getCapital, 
  getNativeName, 
  getCurrencies, 
  getLanguages,
  getFlag 
} from '../../services/api'

/**
 * CountryDetail component displays comprehensive country information
 * @param {Object} country - Complete country data object from API
 * @param {Array} borderCountries - Array of border country objects
 * @param {boolean} isBordersLoading - Loading state for border countries
 * @returns {JSX.Element} Country detail component
 */
const CountryDetail = ({ country, borderCountries, isBordersLoading }) => {
  if (!country) return null

  // Extract and format all the country data
  const commonName = country.name.common
  const nativeName = getNativeName(country.name.nativeName)
  const population = formatNumber(country.population)
  const region = country.region || 'N/A'
  const subregion = country.subregion || 'N/A'
  const capital = getCapital(country.capital)
  const topLevelDomain = country.tld?.[0] || 'N/A'
  const currencies = getCurrencies(country.currencies)
  const languages = getLanguages(country.languages)
  const flag = getFlag(country.flags)

  return (
    <div className="country-detail">
      {/* Country flag */}
      <div className="country-flag">
        <img 
          src={flag} 
          alt={`Flag of ${commonName}`}
          className="flag-image"
        />
      </div>

      {/* Country information */}
      <div className="country-info">
        <h1 className="country-title">{commonName}</h1>
        
        {/* Main country details in two columns */}
        <div className="country-details-grid">
          {/* Left column */}
          <div className="details-column">
            <div className="detail-item">
              <strong>Native Name:</strong> {nativeName}
            </div>
            <div className="detail-item">
              <strong>Population:</strong> {population}
            </div>
            <div className="detail-item">
              <strong>Region:</strong> {region}
            </div>
            <div className="detail-item">
              <strong>Sub Region:</strong> {subregion}
            </div>
            <div className="detail-item">
              <strong>Capital:</strong> {capital}
            </div>
          </div>

          {/* Right column */}
          <div className="details-column">
            <div className="detail-item">
              <strong>Top Level Domain:</strong> {topLevelDomain}
            </div>
            <div className="detail-item">
              <strong>Currencies:</strong> {currencies}
            </div>
            <div className="detail-item">
              <strong>Languages:</strong> {languages}
            </div>
          </div>
        </div>

        {/* Border Countries Section */}
        <div className="border-countries-section">
          <h3>Border Countries:</h3>
          
          {/* Show loading state for borders */}
          {isBordersLoading && (
            <div className="borders-loading">
              <span>Loading border countries...</span>
            </div>
          )}
          
          {/* Show border countries if available */}
          {!isBordersLoading && borderCountries && borderCountries.length > 0 && (
            <div className="border-countries">
              {borderCountries.map((borderCountry) => (
                <Link
                  key={borderCountry.cca3}
                  to={`/country/${borderCountry.cca3}`}
                  className="border-country-link"
                  title={`View details for ${borderCountry.name.common}`}
                >
                  {borderCountry.name.common}
                </Link>
              ))}
            </div>
          )}
          
          {/* Show message if no border countries */}
          {!isBordersLoading && (!borderCountries || borderCountries.length === 0) && (
            <div className="no-borders">
              <span>No border countries</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryDetail