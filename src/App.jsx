// src/App.jsx
// This is the main App component that wraps our entire application
// It provides routing and theme context to all child components
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { GeoProvider } from './context/GeoContext'  // NEW: Import GeoProvider
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CountryDetailPage from './pages/CountryDetailPage'
import ErrorBoundary from './components/layout/ErrorBoundary'
import TestGeoContext from './components/TestGeoContext'  // NEW: Temporary test component

function App() {
  return (
    /* ErrorBoundary catches any JavaScript errors in our component tree */       
    <ErrorBoundary>
      {/* ThemeProvider gives all components access to theme state */}
      <ThemeProvider>
        {/* NEW: GeoProvider gives all components access to geographic state */}
        <GeoProvider>
          {/* Router enables client-side routing (no page reloads) */}
          <Router>
            {/* Layout provides consistent structure across all pages */}
            <Layout>
              {/* NEW: Temporary test component - remove after verification */}
              <TestGeoContext />
              
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
        </GeoProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App