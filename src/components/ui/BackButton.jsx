// src/components/ui/BackButton.jsx
// Reusable back button component for navigation
// This replaces the back button functionality from your original country.html

import React from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * BackButton component for navigating back to previous page
 * @param {string} className - Additional CSS classes
 * @returns {JSX.Element} Back button component
 */
const BackButton = ({ className = '' }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    // Use browser history to go back, or fallback to home page
    if (window.history.length > 2) {
      navigate(-1) // Go back to previous page
    } else {
      navigate('/') // Go to home page if no history
    }
  }

  return (
    <button 
      onClick={handleBack}
      className={`back-button ${className}`}
      aria-label="Go back to previous page"
    >
      ← Back
    </button>
  )
}

export default BackButton