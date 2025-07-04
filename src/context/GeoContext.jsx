import React, { createContext, useContext, useReducer, useEffect } from 'react';

/**
 * Geographic Context for World Explorer Pro
 * 
 * This context manages all geographic-related state including:
 * - Search queries and results
 * - User location data
 * - Map state and positioning
 * - Comparison mode for multiple locations
 * 
 * Using the Context API with useReducer pattern for predictable state updates
 */

// Initial state - defines the shape of our data
const initialState = {
  // Search related state
  searchQuery: '',           // Current search input value
  searchType: null,          // 'country' | 'ip' | null
  searchResults: null,       // Results from search
  searchHistory: [],         // Array of previous searches
  isSearching: false,        // Loading state for search
  searchError: null,         // Error message if search fails
  
  // User location state
  userLocation: null,        // User's geographic coordinates
  userIP: null,              // User's IP address
  
  // Map state
  mapCenter: [0, 0],         // [latitude, longitude] for map center
  mapZoom: 2,                // Zoom level (2 = world view)
  selectedLocation: null,    // Currently selected location on map
  
  // Comparison mode
  comparisonMode: false,     // Whether comparison mode is active
  comparisonItems: []        // Array of items to compare (max 2)
};

/**
 * Action types - define all possible state changes
 * Using constants prevents typos and makes refactoring easier
 */
const ActionTypes = {
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_SEARCH_ERROR: 'SET_SEARCH_ERROR',
  SET_IS_SEARCHING: 'SET_IS_SEARCHING',
  ADD_TO_HISTORY: 'ADD_TO_HISTORY',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
  SET_USER_LOCATION: 'SET_USER_LOCATION',
  SET_MAP_VIEW: 'SET_MAP_VIEW',
  SET_SELECTED_LOCATION: 'SET_SELECTED_LOCATION',
  ADD_COMPARISON_ITEM: 'ADD_COMPARISON_ITEM',
  REMOVE_COMPARISON_ITEM: 'REMOVE_COMPARISON_ITEM',
  CLEAR_COMPARISON: 'CLEAR_COMPARISON'
};

/**
 * Reducer function - handles all state updates
 * 
 * @param {Object} state - Current state
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New state
 * 
 * Pure function - doesn't modify state directly, returns new state object
 */
const geoReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_QUERY:
      // Update search query
      return { 
        ...state, 
        searchQuery: action.payload 
      };
      
    case ActionTypes.SET_SEARCH_RESULTS:
      // Set search results and clear loading/error states
      return { 
        ...state, 
        searchResults: action.payload.results,
        searchType: action.payload.type,
        isSearching: false,
        searchError: null
      };
      
    case ActionTypes.SET_SEARCH_ERROR:
      // Set error message and clear loading state
      return { 
        ...state, 
        searchError: action.payload,
        isSearching: false,
        searchResults: null
      };
      
    case ActionTypes.SET_IS_SEARCHING:
      // Toggle searching state
      return { 
        ...state, 
        isSearching: action.payload 
      };
      
    case ActionTypes.ADD_TO_HISTORY:
      // Add new search to history (max 10 items)
      const newHistory = [action.payload, ...state.searchHistory]
        .slice(0, 10); // Keep only last 10 searches
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
      
      return { 
        ...state, 
        searchHistory: newHistory 
      };
      
    case ActionTypes.CLEAR_HISTORY:
      // Clear all search history
      try {
        localStorage.removeItem('searchHistory');
      } catch (error) {
        console.error('Failed to clear search history:', error);
      }
      
      return { 
        ...state, 
        searchHistory: [] 
      };
      
    case ActionTypes.SET_USER_LOCATION:
      // Set user's location and IP
      return { 
        ...state, 
        userLocation: action.payload.location,
        userIP: action.payload.ip 
      };
      
    case ActionTypes.SET_MAP_VIEW:
      // Update map center and zoom
      return { 
        ...state, 
        mapCenter: action.payload.center,
        mapZoom: action.payload.zoom 
      };
      
    case ActionTypes.SET_SELECTED_LOCATION:
      // Set the selected location on map
      return { 
        ...state, 
        selectedLocation: action.payload 
      };
      
    case ActionTypes.ADD_COMPARISON_ITEM:
      // Add item to comparison (max 2)
      const newComparisonItems = [...state.comparisonItems, action.payload]
        .slice(-2); // Keep only last 2 items
      
      return { 
        ...state, 
        comparisonMode: true,
        comparisonItems: newComparisonItems
      };
      
    case ActionTypes.REMOVE_COMPARISON_ITEM:
      // Remove specific item from comparison
      const filteredItems = state.comparisonItems.filter(
        item => item.id !== action.payload
      );
      
      return { 
        ...state, 
        comparisonItems: filteredItems,
        comparisonMode: filteredItems.length > 0
      };
      
    case ActionTypes.CLEAR_COMPARISON:
      // Clear all comparison items
      return { 
        ...state, 
        comparisonMode: false,
        comparisonItems: [] 
      };
      
    default:
      // Return current state if action type not recognized
      return state;
  }
};

// Create the context
const GeoContext = createContext();

/**
 * Custom hook to use the GeoContext
 * Throws error if used outside of GeoProvider
 * 
 * @returns {Object} Context value with state and actions
 */
export const useGeo = () => {
  const context = useContext(GeoContext);
  if (!context) {
    throw new Error('useGeo must be used within a GeoProvider');
  }
  return context;
};

/**
 * GeoProvider component - wraps app and provides context
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components
 */
export const GeoProvider = ({ children }) => {
  // Initialize reducer with initial state
  const [state, dispatch] = useReducer(geoReducer, initialState);
  
  // Load search history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('searchHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        // Load each history item individually to trigger proper state updates
        history.forEach(item => {
          dispatch({ 
            type: ActionTypes.ADD_TO_HISTORY, 
            payload: item 
          });
        });
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
    }
  }, []); // Empty dependency array = run once on mount
  
  /**
   * Action creators - convenience functions for dispatching actions
   * These make it easier to use the context without remembering action types
   */
  const actions = {
    // Search actions
    setSearchQuery: (query) => 
      dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
      
    setSearchResults: (results, type) => 
      dispatch({ 
        type: ActionTypes.SET_SEARCH_RESULTS, 
        payload: { results, type } 
      }),
      
    setSearchError: (error) => 
      dispatch({ type: ActionTypes.SET_SEARCH_ERROR, payload: error }),
      
    setIsSearching: (isSearching) => 
      dispatch({ type: ActionTypes.SET_IS_SEARCHING, payload: isSearching }),
      
    addToHistory: (item) => 
      dispatch({ type: ActionTypes.ADD_TO_HISTORY, payload: item }),
      
    clearHistory: () => 
      dispatch({ type: ActionTypes.CLEAR_HISTORY }),
      
    // Location actions
    setUserLocation: (location, ip) => 
      dispatch({ 
        type: ActionTypes.SET_USER_LOCATION, 
        payload: { location, ip } 
      }),
      
    // Map actions
    setMapView: (center, zoom) => 
      dispatch({ 
        type: ActionTypes.SET_MAP_VIEW, 
        payload: { center, zoom } 
      }),
      
    setSelectedLocation: (location) => 
      dispatch({ type: ActionTypes.SET_SELECTED_LOCATION, payload: location }),
      
    // Comparison actions
    addComparisonItem: (item) => 
      dispatch({ type: ActionTypes.ADD_COMPARISON_ITEM, payload: item }),
      
    removeComparisonItem: (id) => 
      dispatch({ type: ActionTypes.REMOVE_COMPARISON_ITEM, payload: id }),
      
    clearComparison: () => 
      dispatch({ type: ActionTypes.CLEAR_COMPARISON })
  };
  
  // Context value includes both state and action creators
  const value = {
    ...state,      // Spread all state properties
    dispatch,      // Raw dispatch for advanced usage
    actions        // Convenient action creators
  };
  
  return (
    <GeoContext.Provider value={value}>
      {children}
    </GeoContext.Provider>
  );
};

// Export action types for testing or external usage
export { ActionTypes };