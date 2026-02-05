import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>Doctor Plus+</div>
        <nav style={styles.sideNav}>
          <Link to="/dashboard" style={styles.sideLinkActive}>Dashboard</Link>
          <Link to="/appointments" style={styles.sideLink}>Appointments</Link>
        </nav>
        <button style={styles.logoutBtn} onClick={() => navigate('/')}>Logout</button>
      </aside>
      <main style={styles.mainContent}>
        <h2>Welcome back, <span style={{color: '#00d09c'}}>Koushik</span></h2>
        <div style={styles.statsGrid}>
          <div style={styles.statCard}><p>Appointments</p><h3>02</h3></div>
          <div style={styles.statCard}><p>Heart Rate</p><h3>72 bpm</h3></div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: { display: 'flex', flexWrap: 'wrap', minHeight: '100vh', backgroundColor: '#f4f7f6' },
  sidebar: { width: '250px', backgroundColor: '#fff', padding: '20px', borderRight: '1px solid #ddd', flexShrink: 0 },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#00d09c', marginBottom: '30px' },
  sideNav: { display: 'flex', flexDirection: 'column', gap: '10px' },
  sideLinkActive: { textDecoration: 'none', color: '#fff', backgroundColor: '#00d09c', padding: '10px', borderRadius: '8px' },
  sideLink: { textDecoration: 'none', color: '#666', padding: '10px' },
  logoutBtn: { marginTop: '20px', backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  mainContent: { flex: 1, padding: '20px', minWidth: '300px' },
  statsGrid: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' },
  statCard: { background: '#fff', padding: '20px', borderRadius: '15px', flex: '1 1 200px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }
};
export default Dashboard;