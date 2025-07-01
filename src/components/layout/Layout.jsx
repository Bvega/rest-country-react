// src/components/layout/Layout.jsx
// This component provides consistent layout structure across all pages
// It includes the header and main content area

import React from 'react'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      {/* Header appears on every page */}
      <Header />
      
      {/* Main content area where page components are rendered */}
      <main className="main-content">
        <div className="container">
          {/* children represents the current page component */}
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout