/**
 * Constants Configuration File
 * 
 * Centralizes all constant values used throughout the application.
 * This makes it easy to update values and maintain consistency.
 * 
 * Benefits:
 * - Single source of truth for configuration
 * - Easy to update API endpoints or limits
 * - Prevents magic numbers in code
 * - Improves code readability
 */

/**
 * API Endpoints Configuration
 * 
 * Note: ip-api.com is used for the free tier (no API key required)
 * Limitations: 45 requests per minute from the same IP
 */
export const API_ENDPOINTS = {
  // REST Countries API endpoints
  COUNTRIES: 'https://restcountries.com/v3.1',
  COUNTRIES_ALL: 'https://restcountries.com/v3.1/all',
  COUNTRIES_NAME: 'https://restcountries.com/v3.1/name',
  COUNTRIES_CODE: 'https://restcountries.com/v3.1/alpha',
  
  // IP Geolocation endpoints
  IP_GEOLOCATION: 'http://ip-api.com/json',        // Free, no key required
  IP_GEOLOCATION_BATCH: 'http://ip-api.com/batch', // Batch endpoint for multiple IPs
  IP_CURRENT: 'https://api.ipify.org',             // Get user's current IP
  
  // Alternative IP services (require API keys)
  IP_API_CO: 'https://ipapi.co',                   // Requires API key
  IP_GEOLOCATION_IO: 'https://api.ipgeolocation.io/ipgeo' // Requires API key
};

/**
 * Map Configuration
 * 
 * Settings for Leaflet map component
 */
export const MAP_CONFIG = {
  // Default map center (null island - 0°N 0°E)
  DEFAULT_CENTER: [0, 0],
  
  // Zoom levels
  DEFAULT_ZOOM: 2,        // World view
  MIN_ZOOM: 2,            // Prevent zooming out too far
  MAX_ZOOM: 18,           // Street level detail
  COUNTRY_ZOOM: 5,        // Good for most countries
  CITY_ZOOM: 12,          // City level view
  IP_LOCATION_ZOOM: 13,   // Detailed view for IP locations
  
  // OpenStreetMap tile server (free)
  TILE_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  
  // Map attribution (required by OpenStreetMap)
  ATTRIBUTION: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  
  // Alternative tile providers (some require API keys)
  TILE_PROVIDERS: {
    OSM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    CARTO_LIGHT: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    CARTO_DARK: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    STAMEN_TONER: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png'
  }
};

/**
 * Search Configuration
 * 
 * Controls search behavior and limits
 */
export const SEARCH_CONFIG = {
  // Debounce delay in milliseconds (prevents too many API calls)
  DEBOUNCE_DELAY: 300,
  
  // Minimum characters before searching
  MIN_QUERY_LENGTH: 2,
  
  // Maximum search history items to store
  MAX_HISTORY_ITEMS: 10,
  
  // Search result limits
  MAX_SEARCH_RESULTS: 50,
  
  // Cache duration in milliseconds (1 hour)
  CACHE_DURATION: 3600000,
  
  // Rate limiting
  RATE_LIMIT_REQUESTS: 45,     // Max requests
  RATE_LIMIT_WINDOW: 60000,    // Per minute (60000ms)
};

/**
 * Error Messages
 * 
 * User-friendly error messages for different scenarios
 */
export const ERROR_MESSAGES = {
  // Validation errors
  INVALID_IP: 'Please enter a valid IP address (e.g., 8.8.8.8)',
  INVALID_COUNTRY: 'Please enter a valid country name',
  EMPTY_SEARCH: 'Please enter a country name or IP address',
  
  // API errors
  COUNTRY_NOT_FOUND: 'Country not found. Try a different spelling.',
  IP_NOT_FOUND: 'Unable to locate this IP address',
  API_ERROR: 'Failed to fetch data. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  RATE_LIMIT_ERROR: 'Too many requests. Please wait a moment.',
  
  // Location errors
  GEOLOCATION_ERROR: 'Unable to get your location',
  GEOLOCATION_DENIED: 'Location access denied. Please enable location services.',
  GEOLOCATION_UNAVAILABLE: 'Location information unavailable',
  GEOLOCATION_TIMEOUT: 'Location request timed out',
  
  // Generic errors
  UNKNOWN_ERROR: 'An unexpected error occurred',
  LOADING_ERROR: 'Failed to load data'
};

/**
 * Success Messages
 * 
 * Positive feedback messages for user actions
 */
export const SUCCESS_MESSAGES = {
  LOCATION_FOUND: 'Location found successfully',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard',
  HISTORY_CLEARED: 'Search history cleared',
  CACHE_CLEARED: 'Cache cleared successfully'
};

/**
 * Local Storage Keys
 * 
 * Keys for storing data in browser's localStorage
 * Prefixed with 'worldExplorer' to avoid conflicts
 */
export const STORAGE_KEYS = {
  SEARCH_HISTORY: 'worldExplorerSearchHistory',
  USER_PREFERENCES: 'worldExplorerPreferences',
  CACHED_IP_LOOKUPS: 'worldExplorerIPCache',
  THEME_PREFERENCE: 'worldExplorerTheme',
  MAP_PREFERENCES: 'worldExplorerMapPrefs',
  LAST_LOCATION: 'worldExplorerLastLocation'
};

/**
 * UI Configuration
 * 
 * User interface constants
 */
export const UI_CONFIG = {
  // Animation durations in milliseconds
  ANIMATION_DURATION: 300,
  MAP_FLY_DURATION: 1500,
  
  // Breakpoints for responsive design
  BREAKPOINTS: {
    MOBILE: 480,
    TABLET: 768,
    DESKTOP: 1024,
    WIDE: 1440
  },
  
  // Theme colors (CSS custom properties)
  THEME_COLORS: {
    LIGHT: {
      PRIMARY: '#667eea',
      SECONDARY: '#764ba2',
      BACKGROUND: '#ffffff',
      TEXT: '#2d3748',
      BORDER: '#e2e8f0'
    },
    DARK: {
      PRIMARY: '#667eea',
      SECONDARY: '#764ba2',
      BACKGROUND: '#1a202c',
      TEXT: '#e2e8f0',
      BORDER: '#2d3748'
    }
  }
};

/**
 * Feature Flags
 * 
 * Enable/disable features for testing or gradual rollout
 */
export const FEATURES = {
  ENABLE_IP_TRACKING: true,
  ENABLE_COMPARISON_MODE: true,
  ENABLE_EXPORT: false,        // Coming in Phase 5
  ENABLE_GOOGLE_EARTH: false,  // Coming in Phase 5
  ENABLE_ANALYTICS: false,     // Future feature
  ENABLE_OFFLINE_MODE: false   // Future feature
};

/**
 * Country Data Configuration
 * 
 * Settings for country-specific features
 */
export const COUNTRY_CONFIG = {
  // Fields to display from REST Countries API
  DISPLAY_FIELDS: [
    'name',
    'capital',
    'population',
    'area',
    'region',
    'subregion',
    'languages',
    'currencies',
    'timezones'
  ],
  
  // Population formatting thresholds
  POPULATION_FORMATS: {
    MILLION: 1000000,
    THOUSAND: 1000
  }
};

/**
 * IP Information Configuration
 * 
 * Settings for IP geolocation features
 */
export const IP_CONFIG = {
  // Fields to request from IP API
  FIELDS: [
    'status',
    'message',
    'country',
    'countryCode',
    'region',
    'regionName',
    'city',
    'zip',
    'lat',
    'lon',
    'timezone',
    'isp',
    'org',
    'as',
    'query'
  ],
  
  // IP types
  TYPES: {
    IPV4: 'IPv4',
    IPV6: 'IPv6'
  }
};

/**
 * Export formats
 * 
 * Supported export formats for data
 */
export const EXPORT_FORMATS = {
  JSON: {
    extension: 'json',
    mimeType: 'application/json',
    name: 'JSON'
  },
  CSV: {
    extension: 'csv',
    mimeType: 'text/csv',
    name: 'CSV'
  }
};

/**
 * Time Constants
 * 
 * Time-related constants in milliseconds
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000
};