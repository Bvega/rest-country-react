// src/components/theme/ThemeProvider.jsx
// This component manages the application's theme state (light/dark mode)
// It uses React Context to provide theme data to all child components

import React, { createContext, useContext, useState, useEffect } from 'react'

// Create a Context for theme data
// This allows any component to access theme state without prop drilling
const ThemeContext = createContext()

// Custom hook to use theme context
// This simplifies accessing theme data in components
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// ThemeProvider component that wraps our app
export const ThemeProvider = ({ children }) => {
  // State to track if dark mode is enabled
  const [isDark, setIsDark] = useState(false)

  // Effect to check for saved theme preference on component mount
  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // Use saved preference, or fall back to system preference
    const shouldUseDark = savedTheme === 'dark' || (!savedTheme && prefersDark)
    
    setIsDark(shouldUseDark)
    
    // Apply theme class to body element
    document.body.classList.toggle('dark', shouldUseDark)
  }, [])

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    
    // Update body class for CSS styling
    document.body.classList.toggle('dark', newTheme)
    
    // Save preference to localStorage for persistence
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  // Context value that will be provided to all child components
  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}