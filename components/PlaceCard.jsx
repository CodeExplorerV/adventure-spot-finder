import React from 'react'
import { calculateDistance } from '../utils/distance'

function PlaceCard({ place, userLocation, isBookmarked, onBookmarkToggle }) {
  const distance = userLocation 
    ? calculateDistance(
        userLocation.lat, 
        userLocation.lng, 
        place.point.lat, 
        place.point.lon
      )
    : null

  const getPlaceType = (kinds) => {
    const kindsList = kinds.toLowerCase().split(',')
    
    if (kindsList.some(k => k.includes('natural') || k.includes('park') || k.includes('forest'))) {
      return 'nature'
    }
    if (kindsList.some(k => k.includes('mountain') || k.includes('peak') || k.includes('hill'))) {
      return 'mountain'
    }
    if (kindsList.some(k => k.includes('water') || k.includes('lake') || k.includes('river'))) {
      return 'water'
    }
    if (kindsList.some(k => k.includes('historic') || k.includes('monument'))) {
      return 'historic'
    }
    if (kindsList.some(k => k.includes('sport') || k.includes('recreation'))) {
      return 'recreation'
    }
    
    return 'adventure'
  }

  const placeType = getPlaceType(place.kinds)

  return (
    <div className="place-card">
      <h3>{place.name || 'Unnamed Location'}</h3>
      
      <span className="place-type">
        {placeType}
      </span>
      
      {distance && (
        <div className="place-distance">
          📍 {distance.toFixed(1)} km away
        </div>
      )}
      
      <button
        onClick={() => onBookmarkToggle(place)}
        className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
      >
        {isBookmarked ? '❤️ Bookmarked' : '🤍 Bookmark'}
      </button>
    </div>
  )
}

export default PlaceCard
