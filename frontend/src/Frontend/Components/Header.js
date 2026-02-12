import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 5%', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00d09c', cursor: 'pointer' }} onClick={() => navigate('/')}>Doctor Plus+</div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#555' }}>Home</Link>
        <Link to="/menu" style={{ textDecoration: 'none', color: '#555' }}>Menu</Link>
        {userRole ? (
          <button onClick={() => { localStorage.removeItem('role'); navigate('/login'); }} style={{ backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '50px', cursor: 'pointer' }}>Logout</button>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', backgroundColor: '#00d09c', color: '#fff', padding: '8px 20px', borderRadius: '50px' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;