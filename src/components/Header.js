import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const userName = JSON.parse(localStorage.getItem('patientDetails') || '{}').name || 'Guest';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // You can add search functionality here
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-icon">⚕️</span>
          <span className="logo-text">Diagnostics</span>
        </Link>

        {/* Search Bar - Hidden on Mobile */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search Doctors, Specialities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>

        {/* Navigation & Profile */}
        <div className="header-right">
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/booking">Book</Link>
            <Link to="/history">History</Link>
          </nav>

          {/* User Profile Menu */}
          <div className="profile-menu">
            <button 
              className="profile-btn"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="user-name">{userName}</span>
              <span className="dropdown-icon">▼</span>
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                <a href="#profile">Profile</a>
                <a href="#settings">Settings</a>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
