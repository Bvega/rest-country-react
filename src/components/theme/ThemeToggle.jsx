// src/components/theme/ThemeToggle.jsx
// A reusable button component for toggling between light and dark themes

import React from 'react'
import { useTheme } from './ThemeProvider'

const ThemeToggle = () => {
  // Get theme state and toggle function from context
  const { isDark, toggleTheme } = useTheme()

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Show moon icon for dark mode, sun icon for light mode */}
      {isDark ? '☀️' : '🌙'} 
      {isDark ? ' Light Mode' : ' Dark Mode'}
    </button>
  )
}

export default ThemeToggle