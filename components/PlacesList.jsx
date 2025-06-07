import React from 'react'
import PlaceCard from './PlaceCard'

function PlacesList({ places, userLocation, bookmarks, onBookmarkToggle }) {
  if (places.length === 0) {
    return (
      <div className="no-bookmarks">
        <h3>No adventure spots found in this area 🔍</h3>
        <p>Try adjusting your filters or search in a different location.</p>
      </div>
    )
  }

  return (
    <div className="places-grid">
      {places.map((place) => (
        <PlaceCard
          key={place.xid}
          place={place}
          userLocation={userLocation}
          isBookmarked={bookmarks.some(bookmark => bookmark.xid === place.xid)}
          onBookmarkToggle={onBookmarkToggle}
        />
      ))}
    </div>
  )
}

export default PlacesList
