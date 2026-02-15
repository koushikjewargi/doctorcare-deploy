import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const userRole = localStorage.getItem('role') || 'doctor'; 

  return (
    <div style={styles.container}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <p style={styles.roleTag}>{userRole.toUpperCase()} PANEL</p>
        <nav style={styles.sideNav}>
          <Link to="/dashboard" style={styles.sideLinkActive}>Dashboard</Link>
          <Link to="/appointments" style={styles.sideLink}>Appointments</Link>
          {userRole === 'admin' && (
            <Link to="/manage-users" style={styles.adminLink}>Manage Doctors</Link>
          )}
          <Link to="/reports" style={styles.sideLink}>Medical Reports</Link>
          <Link to="/settings" style={styles.sideLink}>Settings</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main style={styles.mainContent}>
        <header style={styles.header}>
          <h2 style={styles.welcomeTitle}>Welcome back, <span style={{color: '#00d09c'}}>Koushik</span></h2>
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
  container: { 
    display: 'flex', 
    flexWrap: 'wrap', // Allows wrap on mobile
    minHeight: '90vh', 
    backgroundColor: '#f4f7f6' 
  },
  sidebar: { 
    width: '100%', // Mobile default
    maxWidth: '250px', 
    flex: '1 1 250px', // Flex basis for sidebar
    backgroundColor: '#fff', 
    padding: '20px', 
    display: 'flex', 
    flexDirection: 'column', 
    borderRight: '1px solid #e0e0e0',
    minHeight: 'auto'
  },
  roleTag: { fontSize: '12px', color: '#888', fontWeight: 'bold', marginBottom: '20px', letterSpacing: '1px' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 },
  sideLink: { textDecoration: 'none', color: '#666', padding: '10px', borderRadius: '8px', fontSize: '14px' },
  sideLinkActive: { textDecoration: 'none', color: '#fff', backgroundColor: '#00d09c', padding: '10px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' },
  adminLink: { textDecoration: 'none', color: '#ff7f00', fontWeight: 'bold', padding: '10px', backgroundColor: '#fff5eb', borderRadius: '8px', fontSize: '14px' },
  mainContent: { 
    flex: '1 1 350px', 
    padding: 'clamp(20px, 4vw, 40px)', 
    minWidth: '300px' 
  },
  header: { marginBottom: '30px' },
  welcomeTitle: { fontSize: 'clamp(20px, 5vw, 26px)', margin: 0 },
  statsGrid: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  statCard: { 
    backgroundColor: '#fff', 
    padding: '20px', 
    borderRadius: '15px', 
    flex: '1 1 150px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center'
  }
};

export default Dashboard;