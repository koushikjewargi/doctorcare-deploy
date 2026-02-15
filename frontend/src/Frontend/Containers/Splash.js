import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Start animation
    setShow(true);
    // Redirect after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>
      {/* Background Circles (Decorative) */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>

      <div style={{...styles.content, opacity: show ? 1 : 0, transform: show ? 'scale(1)' : 'scale(0.9)'}}>
        <div style={styles.logoBox}>
          <span style={styles.logoText}>D+</span>
        </div>
        <h1 style={styles.title}>Doctor Plus+</h1>
        <p style={styles.tagline}>Your Health, Our Priority</p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    height: '100vh', 
    backgroundColor: '#00d09c', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    position: 'relative', 
    overflow: 'hidden' 
  },
  content: { 
    textAlign: 'center', 
    zIndex: 2, 
    transition: 'all 1s ease-out' 
  },
  logoBox: { 
    width: '100px', 
    height: '100px', 
    backgroundColor: '#fff', 
    borderRadius: '25px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: '0 auto 20px auto', 
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)' 
  },
  logoText: { fontSize: '40px', fontWeight: '900', color: '#00d09c' },
  title: { fontSize: '36px', fontWeight: 'bold', color: '#fff', margin: 0 },
  tagline: { fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginTop: '10px' },
  
  // Decorative Backgrounds
  circle1: { position: 'absolute', top: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' },
  circle2: { position: 'absolute', bottom: '-10%', right: '-10%', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)' }
};

export default Splash;