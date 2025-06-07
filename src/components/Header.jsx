import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <h1>🏔️ Adventure Spot Finder</h1>
      <nav className="nav">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          Discover
        </Link>
        <Link 
          to="/bookmarks" 
          className={`nav-link ${location.pathname === '/bookmarks' ? 'active' : ''}`}
        >
          Bookmarks
        </Link>
      </nav>
    </header>
  )
}

export default Header
