// src/App.jsx
// This is the main App component that wraps our entire application
// It provides routing and theme context to all child components

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CountryDetailPage from './pages/CountryDetailPage'
import ErrorBoundary from './components/layout/ErrorBoundary'

function App() {
  return (
    /* ErrorBoundary catches any JavaScript errors in our component tree */
    <ErrorBoundary>
      {/* ThemeProvider gives all components access to theme state */}
      <ThemeProvider>
        {/* Router enables client-side routing (no page reloads) */}
        <Router>
          {/* Layout provides consistent structure across all pages */}
          <Layout>
            {/* Routes define which component to show for each URL */}
            <Routes>
              {/* Home page route - shows all countries */}
              <Route path="/" element={<HomePage />} />
              
              {/* Country detail route - shows specific country */}
              {/* :code is a URL parameter (like ?code=USA in your vanilla JS) */}
              <Route path="/country/:code" element={<CountryDetailPage />} />
              
              {/* Fallback route for unknown URLs */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App