import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  // We check if a 'role' is stored. If null, the user is NOT logged in.
  const userRole = localStorage.getItem('role'); 

  const handleLogout = () => {
    localStorage.removeItem('role'); // Deletes the session
    alert("Logged out successfully.");
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      {/* Navbar: This part handles the "Before" and "After" login view */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.logo}>Doctor Plus+</div>
          <div style={styles.searchWrapper}>
            <input 
              type="text" 
              placeholder="Search Doctors, Specialities..." 
              style={styles.headerSearch} 
            />
          </div>
        </div>
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/about" style={styles.link}>About Us</Link>
          
          {/* LOGIC: If userRole is null (Before Login), show Login button. 
              If userRole exists (After Login), show Logout. */}
          {userRole ? (
            <div style={styles.loggedInSection}>
              <span style={styles.welcomeText}>Hello, Koushik</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <Link to="/login" style={styles.loginBtn}>Login / Sign Up</Link>
          )}
        </div>
      </nav>

      <main style={styles.main}>
        {/* Professional eSeva-Style Info Card */}
        <section style={styles.contentSection}>
          <div style={styles.infoCard}>
            <h3 style={styles.cardHeader}>
              <span style={styles.tealStar}>★</span> who we are?
            </h3>
            <p style={styles.cardBody}>
              Doctor Plus+ is a citizen-focused digital platform designed to simplify access to healthcare 
              services and medical benefits across India. Our mission is to bridge the gap between 
              the people and healthcare providers. 
              
              {/* This specific text only appears AFTER a patient logs in */}
              {userRole === 'patient' && (
                <span style={styles.loginAlert}>
                  Welcome back! You can now access your personalized booking features below.
                </span>
              )}
            </p>
            
            {/* Call to Action: Only visible to logged-in patients */}
            {userRole === 'patient' && (
              <button style={styles.bookNowBtn} onClick={() => navigate('/search')}>
                Book Appointment Now
              </button>
            )}
          </div>
        </section>

        {/* The Grid stays visible for everyone so they see what services you offer */}
        <section style={styles.servicesSection}>
          <h3 style={styles.sectionTitle}>Our Specialized Services</h3>
          <div style={styles.grid}>
            {['Cardiology', 'Dental', 'Neurology', 'General'].map((spec) => (
              <div key={spec} style={styles.serviceCard}>
                <div style={styles.iconCircle}>🩺</div>
                <h4 style={styles.serviceName}>{spec}</h4>
                <p style={styles.serviceDesc}>Expert resources for {spec.toLowerCase()} care.</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: '#f9f9f9', minHeight: '100vh' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 5%', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 },
  navLeft: { display: 'flex', alignItems: 'center', gap: '40px' },
  logo: { fontSize: '24px', fontWeight: 'bold', color: '#00d09c' },
  searchWrapper: { position: 'relative' },
  headerSearch: { padding: '10px 20px', borderRadius: '50px', border: '1px solid #eee', width: '300px', outline: 'none', backgroundColor: '#f1f3f4' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { textDecoration: 'none', color: '#555', fontWeight: '500', fontSize: '14px' },
  loggedInSection: { display: 'flex', alignItems: 'center', gap: '15px' },
  welcomeText: { fontSize: '14px', fontWeight: 'bold', color: '#333' },
  logoutBtn: { backgroundColor: '#ff4d4d', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' },
  loginBtn: { textDecoration: 'none', backgroundColor: '#00d09c', color: '#fff', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '14px' },
  main: { padding: '60px 5%' },
  contentSection: { display: 'flex', justifyContent: 'center', marginBottom: '60px' },
  infoCard: { backgroundColor: '#fff', padding: '40px', borderRadius: '15px', maxWidth: '850px', borderLeft: '8px solid #00d09c', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  cardHeader: { color: '#333', fontSize: '26px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' },
  tealStar: { color: '#00d09c' },
  cardBody: { color: '#666', lineHeight: '1.9', fontSize: '16px' },
  loginAlert: { display: 'block', marginTop: '10px', fontWeight: 'bold', color: '#00d09c' },
  bookNowBtn: { marginTop: '20px', backgroundColor: '#00d09c', color: '#fff', padding: '12px 30px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  servicesSection: { textAlign: 'center' },
  sectionTitle: { fontSize: '28px', color: '#333', marginBottom: '40px' },
  grid: { display: 'flex', justifyContent: 'center', gap: '25px', flexWrap: 'wrap' },
  serviceCard: { backgroundColor: '#fff', padding: '30px 20px', borderRadius: '20px', width: '220px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', border: '1px solid #f0f0f0' },
  iconCircle: { fontSize: '30px', marginBottom: '15px' },
  serviceName: { color: '#00d09c', fontWeight: 'bold' },
  serviceDesc: { fontSize: '13px', color: '#888' }
};

export default Home;