/**
 * Test Component for GeoContext
 * 
 * This is a temporary component to verify our context is working correctly.
 * We'll use it to test state management before building the real components.
 * 
 * This component will be removed later - it's just for testing!
 */

import React from 'react'
import { useGeo } from '../context/GeoContext'
import { detectSearchType, isValidIPAddress } from '../utils/validators'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants'

const TestGeoContext = () => {
  const { 
    searchQuery, 
    searchHistory, 
    mapCenter, 
    mapZoom,
    actions 
  } = useGeo()

  // Test search functionality
  const handleTestSearch = () => {
    const testQuery = '8.8.8.8'
    actions.setSearchQuery(testQuery)
    
    const searchType = detectSearchType(testQuery)
    console.log('Search type detected:', searchType)
    
    if (searchType === 'ip' && isValidIPAddress(testQuery)) {
      actions.addToHistory({
        query: testQuery,
        type: 'ip',
        timestamp: Date.now(),
        result: { location: { country: 'Test Country' } }
      })
      console.log(SUCCESS_MESSAGES.LOCATION_FOUND)
    } else {
      console.log(ERROR_MESSAGES.INVALID_IP)
    }
  }

  // Test map functionality
  const handleTestMap = () => {
    actions.setMapView([40.7128, -74.0060], 10) // New York coordinates
    console.log('Map view updated to New York')
  }

  // Test error handling
  const handleTestError = () => {
    actions.setSearchError(ERROR_MESSAGES.NETWORK_ERROR)
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f0f0', 
      margin: '20px',
      borderRadius: '8px',
      border: '2px dashed #667eea'
    }}>
      <h2>🧪 GeoContext Test Component</h2>
      <p>This component tests our context setup. Remove it after verification!</p>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Current State:</h3>
        <ul>
          <li>Search Query: <strong>{searchQuery || 'none'}</strong></li>
          <li>History Items: <strong>{searchHistory.length}</strong></li>
          <li>Map Center: <strong>{mapCenter.join(', ')}</strong></li>
          <li>Map Zoom: <strong>{mapZoom}</strong></li>
        </ul>
      </div>
      
      <div style={{ marginTop: '20px' }}>
        <h3>Test Actions:</h3>
        <button 
          onClick={handleTestSearch} 
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test IP Search
        </button>
        <button 
          onClick={handleTestMap} 
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#48bb78',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Map Update
        </button>
        <button 
          onClick={handleTestError} 
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#f56565',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Error
        </button>
        <button 
          onClick={() => actions.clearHistory()}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#718096',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear History
        </button>
      </div>
      
      {searchHistory.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Search History:</h3>
          <ul>
            {searchHistory.map((item, index) => (
              <li key={index}>
                {item.query} ({item.type}) - {new Date(item.timestamp).toLocaleTimeString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default TestGeoContext