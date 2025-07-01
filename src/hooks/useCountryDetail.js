// src/hooks/useCountryDetail.js
// Custom hook for managing individual country detail data
// This replaces the logic from your original country.js

import { useState, useEffect } from 'react'
import { fetchCountryByCode, fetchCountriesByCodes } from '../services/api'

/**
 * Custom hook for fetching and managing country detail data
 * This encapsulates the logic from your original country.js file
 * @param {string} countryCode - 3-letter country code from URL
 * @returns {Object} Country detail data and state
 */
export function useCountryDetail(countryCode) {
  // State for the main country data
  const [country, setCountry] = useState(null)
  
  // State for border countries data
  const [borderCountries, setBorderCountries] = useState([])
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true)
  const [isBordersLoading, setIsBordersLoading] = useState(false)
  
  // Error state
  const [error, setError] = useState(null)

  // Effect to fetch country data when countryCode changes
  useEffect(() => {
    /**
     * Async function to load country details
     * This replaces the init() function from your original country.js
     */
    async function loadCountryDetail() {
      if (!countryCode) {
        setError('No country code provided')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)
        
        console.log(`🔍 Loading details for country: ${countryCode}`)
        
        // Fetch main country data
        const countryData = await fetchCountryByCode(countryCode)
        
        if (!countryData) {
          throw new Error('Country not found')
        }
        
        setCountry(countryData)
        console.log(`✅ Loaded country: ${countryData.name.common}`)
        
        // If country has borders, fetch border countries data
        if (countryData.borders && countryData.borders.length > 0) {
          setIsBordersLoading(true)
          
          try {
            const borders = await fetchCountriesByCodes(countryData.borders)
            setBorderCountries(borders)
            console.log(`🔗 Loaded ${borders.length} border countries`)
          } catch (borderError) {
            console.warn('⚠️ Failed to load border countries:', borderError)
            setBorderCountries([])
          } finally {
            setIsBordersLoading(false)
          }
        } else {
          setBorderCountries([])
        }
        
      } catch (err) {
        console.error('❌ Failed to load country details:', err)
        setError(err.message)
        setCountry(null)
        setBorderCountries([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCountryDetail()
  }, [countryCode]) // Re-run when countryCode changes

  // Return all the data and state that components need
  return {
    // Main data
    country,
    borderCountries,
    
    // Loading states
    isLoading,
    isBordersLoading,
    
    // Error state
    error,
    
    // Computed values
    hasBorders: borderCountries.length > 0,
    isValidCountry: !!country && !error
  }
}