import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const handleMenuItemClick = () => {
    setTimeout(() => {
      closeSidebar();
    }, 100);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="menu-toggle" onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <Link className="menu-item active" to="/" onClick={handleMenuItemClick}>Diagnostics</Link>
        <Link className="menu-item" to="/history" onClick={handleMenuItemClick}>History</Link>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  );
}
