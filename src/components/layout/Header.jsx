// src/components/layout/Header.jsx
// Application header with title and theme toggle
// Replaces the header functionality from your original HTML

import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../theme/ThemeToggle'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* App title that links back to home page */}
          <Link to="/" className="logo">
            <h1>Where in the world?</h1>
          </Link>
          
          {/* Theme toggle button */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header