import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.logo}>Doctor Plus+</div>
        <div style={styles.navLinks}>
          <Link to="/login" style={styles.loginBtn}>Login / Sign Up</Link>
        </div>
      </nav>

      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Your Health, Our Priority</h1>
          <p style={styles.heroText}>Book appointments with top-rated doctors in seconds.</p>
          <div style={styles.searchContainer}>
            <input type="text" placeholder="Search doctors..." style={styles.searchInput} />
            <button style={styles.searchBtn}>Search</button>
          </div>
        </div>
      </header>

      <section style={styles.section}>
        <h3 style={styles.sectionTitle}>Our Services</h3>
        <div style={styles.grid}>
          {['Cardiology', 'Dental', 'Neurology', 'General'].map((spec) => (
            <div key={spec} style={styles.card}>
              <h4>{spec}</h4>
              <p>Expert care for your needs.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: { fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#f9f9f9' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 5%', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', sticky: 'top' },
  logo: { color: '#00d09c', fontSize: '24px', fontWeight: 'bold' },
  navLinks: { display: 'flex', alignItems: 'center' },
  loginBtn: { textDecoration: 'none', backgroundColor: '#00d09c', color: '#fff', padding: '8px 15px', borderRadius: '8px', fontSize: '14px' },
  hero: { height: '70vh', backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1505751172107-573225a463be?auto=format&fit=crop&w=1350&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: '#fff', padding: '0 20px' },
  heroTitle: { fontSize: 'clamp(32px, 8vw, 48px)', fontWeight: 'bold' },
  heroText: { fontSize: '18px', margin: '20px 0' },
  searchContainer: { display: 'flex', backgroundColor: '#fff', borderRadius: '50px', padding: '5px', width: '100%', maxWidth: '500px', margin: '0 auto' },
  searchInput: { border: 'none', padding: '12px 20px', width: '100%', outline: 'none', borderRadius: '50px' },
  searchBtn: { backgroundColor: '#00d09c', color: '#fff', border: 'none', padding: '0 20px', borderRadius: '50px', cursor: 'pointer' },
  section: { padding: '50px 5%', textAlign: 'center' },
  grid: { display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', width: '200px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }
};

export default Home;