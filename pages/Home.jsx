import React, { useState, useEffect } from 'react'
import Map from '../components/Map'
import PlacesList from '../components/PlacesList'
import Filters from '../components/Filters'
import { getPlacesNearby } from '../services/api'
import { getBookmarks, toggleBookmark } from '../services/storage'

function Home() {
  const [userLocation, setUserLocation] = useState(null)
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedFilters, setSelectedFilters] = useState(['all'])
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const getUserLocation = () => {
    setLoading(true)
    setError('')

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        
        try {
          const placesData = await getPlacesNearby(latitude, longitude)
          setPlaces(placesData)
          setFilteredPlaces(placesData)
        } catch (err) {
          setError('Failed to fetch nearby places. Please try again.')
        } finally {
          setLoading(false)
        }
      },
      (error) => {
        setError('Unable to retrieve your location. Please enable location services.')
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    )
  }

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters)
    
    if (filters.includes('all')) {
      setFilteredPlaces(places)
    } else {
      const filtered = places.filter(place => 
        filters.some(filter => 
          place.kinds.toLowerCase().includes(filter.toLowerCase()) ||
          place.name.toLowerCase().includes(filter.toLowerCase())
        )
      )
      setFilteredPlaces(filtered)
    }
  }

  const handleBookmarkToggle = (place) => {
    toggleBookmark(place)
    setBookmarks(getBookmarks())
  }

  return (
    <div>
      <button 
        onClick={getUserLocation} 
        disabled={loading}
        className="location-btn"
      >
        {loading ? '📍 Finding your location...' : '📍 Find Adventure Spots Near Me'}
      </button>

      {error && <div className="error">{error}</div>}

      {userLocation && (
        <>
          <Filters 
            onFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
          />
          
          <Map 
            center={userLocation} 
            places={filteredPlaces}
            userLocation={userLocation}
          />
          
          <PlacesList 
            places={filteredPlaces}
            userLocation={userLocation}
            bookmarks={bookmarks}
            onBookmarkToggle={handleBookmarkToggle}
          />
        </>
      )}

      {!userLocation && !loading && !error && (
        <div className="loading">
          Click the button above to discover amazing adventure spots near you! 🌲
        </div>
      )}
    </div>
  )
}

export default Home
