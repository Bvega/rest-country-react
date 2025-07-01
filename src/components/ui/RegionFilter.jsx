// src/components/ui/RegionFilter.jsx
// Reusable region filter dropdown component
// This replaces the region select functionality from your original HTML

import React from 'react'

const RegionFilter = ({ value, onChange, regions }) => {
  return (
    <div className="region-filter">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="region-select"
      >
        <option value="">Filter by Region</option>
        {regions.map(region => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  )
}

export default RegionFilter