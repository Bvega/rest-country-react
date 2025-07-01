// src/services/api.js
// Fixed API service with proper error handling and fallback strategies
// This resolves the 400 error you're experiencing

// Base URL for the REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1'

/**
 * Fetches all countries from the REST Countries API with improved error handling
 * @returns {Promise<Array>} Array of country objects
 */
export async function fetchAllCountries() {
  try {
    console.log('🌍 Fetching all countries from API...')
    
    // Add specific fields we need to reduce payload size and improve reliability
    const response = await fetch(`${BASE_URL}/all?fields=name,flags,population,region,capital,cca3`)
    
    // Check if the response is successful
    if (!response.ok) {
      console.error(`API Response Status: ${response.status}`)
      
      // If the fields parameter doesn't work, try without it
      console.log('🔄 Trying fallback request without fields parameter...')
      const fallbackResponse = await fetch(`${BASE_URL}/all`)
      
      if (!fallbackResponse.ok) {
        throw new Error(`HTTP error! status: ${fallbackResponse.status}`)
      }
      
      const countries = await fallbackResponse.json()
      console.log(`✅ Successfully fetched ${countries.length} countries (fallback)`)
      return countries
    }
    
    const countries = await response.json()
    console.log(`✅ Successfully fetched ${countries.length} countries`)
    return countries
    
  } catch (error) {
    console.error('❌ Error fetching countries:', error)
    
    // Try a different endpoint as a last resort
    try {
      console.log('🔄 Trying alternative API endpoint...')
      const alternativeResponse = await fetch('https://restcountries.com/v3.1/independent?status=true')
      
      if (alternativeResponse.ok) {
        const countries = await alternativeResponse.json()
        console.log(`✅ Successfully fetched ${countries.length} countries (alternative)`)
        return countries
      }
    } catch (altError) {
      console.error('❌ Alternative endpoint also failed:', altError)
    }
    
    // Return empty array on error to prevent app crashes
    return []
  }
}

/**
 * Fetches a single country by its 3-letter code
 * @param {string} code - 3-letter country code
 * @returns {Promise<Object|null>} Country object or null if not found
 */
export async function fetchCountryByCode(code) {
  try {
    console.log(`🔍 Fetching country details for: ${code}`)
    
    const response = await fetch(`${BASE_URL}/alpha/${code}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Country not found')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // API returns an array with one country, so we extract the first item
    const country = data[0]
    
    console.log(`✅ Successfully fetched details for: ${country.name.common}`)
    return country
    
  } catch (error) {
    console.error(`❌ Error fetching country ${code}:`, error)
    return null
  }
}

/**
 * Fetches multiple countries by their codes (used for border countries)
 * @param {Array<string>} codes - Array of 3-letter country codes
 * @returns {Promise<Array>} Array of country objects
 */
export async function fetchCountriesByCodes(codes) {
  try {
    if (!codes || codes.length === 0) {
      return []
    }
    
    console.log(`🔗 Fetching ${codes.length} border countries...`)
    
    // Join codes with comma for the API endpoint
    const codesString = codes.join(',')
    const response = await fetch(`${BASE_URL}/alpha?codes=${codesString}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const countries = await response.json()
    console.log(`✅ Successfully fetched ${countries.length} border countries`)
    
    return countries
    
  } catch (error) {
    console.error('❌ Error fetching border countries:', error)
    return []
  }
}

/**
 * Utility function to filter countries by name and region
 * @param {Array} countries - Array of all countries
 * @param {string} searchQuery - Search term for country name
 * @param {string} selectedRegion - Selected region filter
 * @returns {Array} Filtered array of countries
 */
export function filterCountries(countries, searchQuery = '', selectedRegion = '') {
  return countries.filter(country => {
    // Safely access country name
    const countryName = country.name?.common || country.name || ''
    
    // Check if country name matches search query (case-insensitive)
    const matchesSearch = countryName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    
    // Check if country region matches selected region
    const matchesRegion = selectedRegion === '' || country.region === selectedRegion
    
    // Country must match both search and region filters
    return matchesSearch && matchesRegion
  })
}

/**
 * Utility function to format large numbers with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (!num || isNaN(num)) return 'N/A'
  return num.toLocaleString()
}

/**
 * Utility function to safely get the first capital city
 * @param {Array} capitals - Array of capital cities
 * @returns {string} First capital or 'N/A'
 */
export function getCapital(capitals) {
  if (!capitals || !Array.isArray(capitals) || capitals.length === 0) {
    return 'N/A'
  }
  return capitals[0] || 'N/A'
}

/**
 * Utility function to get native name of a country
 * @param {Object} nativeNames - Object containing native names
 * @returns {string} Native name or 'N/A'
 */
export function getNativeName(nativeNames) {
  if (!nativeNames || typeof nativeNames !== 'object') return 'N/A'
  
  // Get the first available native name
  const firstLanguage = Object.keys(nativeNames)[0]
  if (!firstLanguage || !nativeNames[firstLanguage]) return 'N/A'
  
  return nativeNames[firstLanguage].common || nativeNames[firstLanguage].official || 'N/A'
}

/**
 * Utility function to get currencies as a formatted string
 * @param {Object} currencies - Object containing currency data
 * @returns {string} Formatted currency string
 */
export function getCurrencies(currencies) {
  if (!currencies || typeof currencies !== 'object') return 'N/A'
  
  const currencyNames = Object.values(currencies)
    .filter(currency => currency && currency.name)
    .map(currency => currency.name)
  
  return currencyNames.length > 0 ? currencyNames.join(', ') : 'N/A'
}

/**
 * Utility function to get languages as a formatted string
 * @param {Object} languages - Object containing language data
 * @returns {string} Formatted languages string
 */
export function getLanguages(languages) {
  if (!languages || typeof languages !== 'object') return 'N/A'
  
  const languageList = Object.values(languages).filter(Boolean)
  return languageList.length > 0 ? languageList.join(', ') : 'N/A'
}

/**
 * Utility function to safely get country flag
 * @param {Object} flags - Flags object from API
 * @returns {string} Flag URL or fallback
 */
export function getFlag(flags) {
  if (!flags) return ''
  return flags.png || flags.svg || ''
}

/**
 * Test function to verify API connectivity
 * @returns {Promise<boolean>} True if API is working
 */
export async function testApiConnection() {
  try {
    console.log('🧪 Testing API connection...')
    const response = await fetch(`${BASE_URL}/alpha/usa`)
    const isWorking = response.ok
    console.log(`API Status: ${isWorking ? '✅ Working' : '❌ Not working'}`)
    return isWorking
  } catch (error) {
    console.error('❌ API test failed:', error)
    return false
  }
}