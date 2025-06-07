const BOOKMARKS_KEY = 'adventure_spot_bookmarks'

export const getBookmarks = () => {
  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY)
    return bookmarks ? JSON.parse(bookmarks) : []
  } catch (error) {
    console.error('Error getting bookmarks:', error)
    return []
  }
}

export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Error saving bookmarks:', error)
  }
}

export const toggleBookmark = (place) => {
  const bookmarks = getBookmarks()
  const existingIndex = bookmarks.findIndex(bookmark => bookmark.xid === place.xid)
  if (existingIndex >= 0) {
    // Remove bookmark
    bookmarks.splice(existingIndex, 1)
  } else {
    // Add bookmark
    bookmarks.push(place)
  }
  
  saveBookmarks(bookmarks)
}

export const clearAllBookmarks = () => {
  try {
    localStorage.removeItem(BOOKMARKS_KEY)
  } catch (error) {
    console.error('Error clearing bookmarks:', error)
  }
}

export const isBookmarked = (placeXid) => {
  const bookmarks = getBookmarks()
  return bookmarks.some(bookmark => bookmark.xid === placeXid)
}
