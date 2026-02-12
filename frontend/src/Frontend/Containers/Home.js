import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); 

  return (
    <div style={styles.container}>
      <main style={styles.main}>
        {/* About Section */}
        <section style={styles.contentSection}>
          <div style={styles.infoCard}>
            <h3 style={styles.cardHeader}>
              <span style={styles.tealStar}>★</span> who we are?
            </h3>
            <p style={styles.cardBody}>
              Doctor Plus+ is a citizen-focused digital platform designed to simplify access to healthcare 
              services and medical benefits across India. Our mission is to bridge the gap between 
              the people and healthcare providers. 
              
              {userRole === 'patient' && (
                <span style={styles.loginAlert}>
                  Welcome back! You can now access your personalized booking features below.
                </span>
              )}
            </p>
       
            {userRole === 'patient' && (
              <button style={styles.bookNowBtn} onClick={() => navigate('/search')}>
                Book Appointment Now
              </button>
            )}
          </div>
        </section>

        {/* Services Section */}
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
  main: { padding: '40px 5%' },
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