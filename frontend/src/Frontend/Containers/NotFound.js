import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ height: 'calc(100vh - 140px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px' }}>
      <h1 style={{ fontSize: '120px', fontWeight: '900', color: '#e2e8f0', margin: 0, lineHeight: 1 }}>404</h1>
      <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginTop: '-20px' }}>Page Not Found</h2>
      <p style={{ color: '#64748b', margin: '10px 0 30px 0', maxWidth: '400px' }}>
        Oops! The page you are looking for might have been removed or doesn't exist.
      </p>
      <Link to="/menu" style={{ padding: '14px 28px', backgroundColor: '#00d09c', color: '#fff', textDecoration: 'none', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)' }}>
        Go Back Home
      </Link>
    </div>
  );
};
export default NotFound;