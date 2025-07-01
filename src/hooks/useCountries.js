// src/hooks/useCountries.js
// Custom hook for managing countries data, search, and filtering
// This replaces the state management logic from your original main.js

import { useState, useEffect, useMemo } from 'react'
import { fetchAllCountries, filterCountries } from '../services/api'

/**
 * Custom hook that manages countries data and filtering functionality
 * This encapsulates all the logic for fetching, searching, and filtering countries
 * @returns {Object} Countries data and control functions
 */
export function useCountries() {
  // State for storing all countries data
  const [allCountries, setAllCountries] = useState([])
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(true)
  
  // State for error handling
  const [error, setError] = useState(null)
  
  // State for search query (replaces your searchInput.value)
  const [searchQuery, setSearchQuery] = useState('')
  
  // State for region filter (replaces your regionSelect.value)
  const [selectedRegion, setSelectedRegion] = useState('')

  // Effect to fetch countries data when component mounts
  useEffect(() => {
    /**
     * Async function to load countries data
     * This replaces the init() function from your original main.js
     */
    async function loadCountries() {
      try {
        setIsLoading(true)
        setError(null)
        
        // Fetch all countries from API
        const countries = await fetchAllCountries()
        
        if (countries.length === 0) {
          throw new Error('No countries data received')
        }
        
        setAllCountries(countries)
        console.log(`📊 Loaded ${countries.length} countries into React state`)
        
      } catch (err) {
        console.error('❌ Failed to load countries:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadCountries()
  }, []) // Empty dependency array means this runs only once

  // Memoized filtered countries to optimize performance
  // This replaces the applyFilters() function from your original main.js
  const filteredCountries = useMemo(() => {
    if (allCountries.length === 0) return []
    
    const filtered = filterCountries(allCountries, searchQuery, selectedRegion)
    console.log(`🔍 Filtered to ${filtered.length} countries`)
    
    return filtered
  }, [allCountries, searchQuery, selectedRegion])

  // Available regions for the filter dropdown
  const availableRegions = useMemo(() => {
    if (allCountries.length === 0) return []
    
    // Extract unique regions from all countries
    const regions = [...new Set(allCountries.map(country => country.region))]
    return regions.filter(Boolean).sort() // Remove empty values and sort
  }, [allCountries])

  // Return object with all the data and functions components need
  return {
    // Data
    countries: filteredCountries,
    allCountries,
    availableRegions,
    
    // State
    isLoading,
    error,
    searchQuery,
    selectedRegion,
    
    // Actions (these replace your event listeners)
    setSearchQuery,
    setSelectedRegion,
    
    // Computed values
    totalCountries: allCountries.length,
    filteredCount: filteredCountries.length
  }
}