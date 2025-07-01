// src/components/layout/ErrorBoundary.jsx
// This component catches JavaScript errors anywhere in the component tree
// It displays a fallback UI instead of crashing the entire app

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    // State to track if an error has occurred
    this.state = { hasError: false, error: null }
  }

  // This lifecycle method catches errors during rendering
  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true, error }
  }

  // This method logs error details for debugging
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    // If an error occurred, show fallback UI
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Oops! Something went wrong.</h2>
          <p>We're sorry for the inconvenience. Please try refreshing the page.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      )
    }

    // If no error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary