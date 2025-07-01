// src/components/ui/LoadingSpinner.jsx
// A reusable loading spinner component for better user experience

import React from 'react'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  )
}

export default LoadingSpinner