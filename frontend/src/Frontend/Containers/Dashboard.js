import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  // Get the role we saved during login
  const userRole = localStorage.getItem('role') || 'doctor'; 

  const handleLogout = () => {
    localStorage.removeItem('role'); 
    navigate('/login'); 
  };

  return (
    <div style={styles.container}>
      {/* Sidebar - Dynamic based on Role */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>Doctor Plus+</div>
        <p style={styles.roleTag}>{userRole.toUpperCase()} PANEL</p>
        
        <nav style={styles.sideNav}>
          <Link to="/dashboard" style={styles.sideLinkActive}>Dashboard</Link>
          <Link to="/appointments" style={styles.sideLink}>Appointments</Link>
          
          {/* ONLY ADMIN can see User Management */}
          {userRole === 'admin' && (
            <Link to="/manage-users" style={styles.adminLink}>Manage Doctors</Link>
          )}

          <Link to="/reports" style={styles.sideLink}>Medical Reports</Link>
          <Link to="/settings" style={styles.sideLink}>Settings</Link>
        </nav>
        
        <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
      </aside>

      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h2>Welcome back, <span style={{color: '#00d09c'}}>Koushik</span></h2>
          <p>You are logged in as a <strong>{userRole}</strong>.</p>
        </header>

        <section style={styles.statsGrid}>
          <div style={styles.statCard}><p>Total Patients</p><h3>120</h3></div>
          <div style={styles.statCard}><p>Today's Appointments</p><h3>08</h3></div>
          {userRole === 'admin' && (
            <div style={styles.statCard}><p>System Revenue</p><h3>₹45,000</h3></div>
          )}
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f4f7f6' },
  sidebar: { width: '250px', backgroundColor: '#fff', padding: '30px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #e0e0e0' },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#00d09c', marginBottom: '10px' },
  roleTag: { fontSize: '12px', color: '#888', fontWeight: 'bold', marginBottom: '40px', letterSpacing: '1px' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 },
  sideLink: { textDecoration: 'none', color: '#666', padding: '10px', borderRadius: '8px' },
  sideLinkActive: { textDecoration: 'none', color: '#fff', backgroundColor: '#00d09c', padding: '10px', borderRadius: '8px', fontWeight: 'bold' },
  adminLink: { textDecoration: 'none', color: '#ff7f00', fontWeight: 'bold', padding: '10px', backgroundColor: '#fff5eb', borderRadius: '8px' },
  logoutBtn: { backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
  mainContent: { flex: 1, padding: '40px' },
  header: { marginBottom: '40px' },
  statsGrid: { display: 'flex', gap: '20px' },
  statCard: { backgroundColor: '#fff', padding: '25px', borderRadius: '15px', flex: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
};

export default Dashboard;