import React, { useState, useEffect } from 'react'
import PlaceCard from '../components/PlaceCard'
import { getBookmarks, clearAllBookmarks, toggleBookmark } from '../services/storage'

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    setBookmarks(getBookmarks())
  }, [])

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
      clearAllBookmarks()
      setBookmarks([])
    }
  }

  const handleBookmarkToggle = (place) => {
    toggleBookmark(place)
    setBookmarks(getBookmarks())
  }

  return (
    <div>
      <div className="bookmarks-header">
        <h2>Your Bookmarked Adventure Spots</h2>
        {bookmarks.length > 0 && (
          <button onClick={handleClearAll} className="clear-bookmarks-btn">
            Clear All Bookmarks
          </button>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="no-bookmarks">
          <h3>No bookmarks yet! 📌</h3>
          <p>Start exploring and bookmark your favorite adventure spots to see them here.</p>
        </div>
      ) : (
        <div className="places-grid">
          {bookmarks.map((place) => (
            <PlaceCard
              key={place.xid}
              place={place}
              isBookmarked={true}
              onBookmarkToggle={handleBookmarkToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Bookmarks
