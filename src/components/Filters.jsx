import React from 'react'

const filterOptions = [
  { id: 'all', label: 'All Spots', icon: '🌍' },
  { id: 'natural', label: 'Nature', icon: '🌲' },
  { id: 'mountain', label: 'Mountains', icon: '🏔️' },
  { id: 'park', label: 'Parks', icon: '🏞️' },
  { id: 'water', label: 'Water', icon: '💧' },
  { id: 'historic', label: 'Historic', icon: '🏛️' },
  { id: 'sport', label: 'Recreation', icon: '⚽' }
]

function Filters({ onFilterChange, selectedFilters }) {
  const handleFilterClick = (filterId) => {
    let newFilters
    
    if (filterId === 'all') {
      newFilters = ['all']
    } else {
      newFilters = selectedFilters.filter(f => f !== 'all')
      
      if (selectedFilters.includes(filterId)) {
        newFilters = newFilters.filter(f => f !== filterId)
        if (newFilters.length === 0) {
          newFilters = ['all']
        }
      } else {
        newFilters = [...newFilters, filterId]
      }
    }
    
    onFilterChange(newFilters)
  }

  return (
    <div className="filters">
      {filterOptions.map((filter) => (
        <button
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`filter-btn ${selectedFilters.includes(filter.id) ? 'active' : ''}`}
        >
          {filter.icon} {filter.label}
        </button>
      ))}
    </div>
  )
}

export default Filters
