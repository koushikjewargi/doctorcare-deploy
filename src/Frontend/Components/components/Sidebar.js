import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../App.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';   // ✅ only home page

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleMenuItemClick = () => {
    setTimeout(() => {
      closeSidebar();
    }, 100);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setIsOpen(false);
  };

  const menuItems = [
    { path: '/', label: 'Diagnostics', icon: '🏥' },
    { path: '/history', label: 'History', icon: '📋' },
  ];

  // 🚫 Do NOT render sidebar on other pages
  if (!isHome) return null;

  return (
    <>
      {/* Hamburger Button (Home only) */}
      <button className="menu-toggle" onClick={toggleSidebar} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar Navigation Drawer (Home only) */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              to={item.path}
              onClick={handleMenuItemClick}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout" onClick={handleLogout}>
            <span>🚪</span>
            <span>Logout</span>
          </button>
          <p className="sidebar-version">Online Diagnostics v1.0</p>
        </div>
      </aside>

      {/* Overlay for mobile (Home only) */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
}
