import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSendSMS = (e) => {
    e.preventDefault();
    alert(`Reset code sent to ${phoneNumber}`);
    // Pass state so OTP page knows this is a PASSWORD RESET
    navigate('/otp', { state: { flow: 'forgot' } }); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <p style={styles.subtitle}>Reset via SMS</p>
        <p style={styles.infoText}>Enter your 10-digit phone number to receive a reset code.</p>

        <form onSubmit={handleSendSMS} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <div style={styles.phoneInputWrapper}>
              <span style={styles.countryCode}>+91</span>
              <input 
                type="tel" 
                pattern="[0-9]{10}"
                placeholder="9876543210" 
                onChange={(e) => setPhoneNumber(e.target.value)} 
                style={styles.input} 
                required
              />
            </div>
          </div>
          <button type="submit" style={styles.primaryBtn}>Send Reset Code</button>
        </form>

        <div style={styles.footer}>
          <Link to="/login" style={styles.backLink}>← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: 'Segoe UI' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '90%', maxWidth: '400px', padding: '30px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', textAlign: 'center', boxSizing: 'border-box' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#00d09c', margin: 0 },
  subtitle: { fontSize: '18px', color: '#444', fontWeight: '600', marginTop: '5px' },
  infoText: { fontSize: '14px', color: '#666', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
  phoneInputWrapper: { display: 'flex', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' },
  countryCode: { padding: '12px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ddd', color: '#666', fontWeight: 'bold' },
  input: { padding: '12px', border: 'none', fontSize: '16px', outline: 'none', width: '100%' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  footer: { marginTop: '20px' },
  backLink: { color: '#666', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }
};

export default ForgotPassword;