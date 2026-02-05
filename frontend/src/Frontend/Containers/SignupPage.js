import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Pass state so OTP page knows this is a NEW user
    navigate('/otp', { state: { flow: 'signup' } }); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <p style={styles.subtitle}>Join our healthcare community</p>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input type="text" placeholder="e.g. Koushik Jewargi" style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number</label>
            <div style={styles.phoneWrapper}>
              <span style={styles.prefix}>+91</span>
              <input type="tel" pattern="[0-9]{10}" placeholder="9876543210" style={styles.phoneInput} required />
            </div>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Create Password</label>
            <input type="password" placeholder="••••••••" style={styles.input} required />
          </div>
          <button type="submit" style={styles.primaryBtn}>Sign Up & Verify</button>
        </form>
        <p style={styles.footer}>Already have an account? <Link to="/login" style={styles.link}>Login</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: 'Segoe UI' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '90%', maxWidth: '400px', padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', textAlign: 'center', boxSizing: 'border-box' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#00d09c', margin: 0 },
  subtitle: { color: '#666', fontSize: '14px', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#444' },
  input: { padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px', outline: 'none' },
  phoneWrapper: { display: 'flex', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' },
  prefix: { padding: '12px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ddd', color: '#666', fontWeight: 'bold' },
  phoneInput: { padding: '12px', border: 'none', fontSize: '15px', outline: 'none', width: '100%' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' },
  footer: { marginTop: '20px', fontSize: '14px', color: '#444' },
  link: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold' }
};
export default SignupPage;