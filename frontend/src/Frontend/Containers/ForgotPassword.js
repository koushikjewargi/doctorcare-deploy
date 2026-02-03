import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleSendSMS = (e) => {
    e.preventDefault();
    console.log("Sending SMS to:", phoneNumber);
    
    // In a real app, this calls your SMS gateway (like Twilio or Firebase)
    alert(`A reset code has been sent via SMS to ${phoneNumber}`);
    
    // Redirect to OTP page so they can enter the code they just received
    navigate('/otp'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Doctor Plus+</h2>
          <p style={styles.subtitle}>Reset via SMS</p>
        </div>

        <p style={styles.infoText}>
          Enter your registered 10-digit phone number. We will send you a verification code to reset your password.
        </p>

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

// Reusing your consistent Doctor Plus+ Teal styles
const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: "'Segoe UI', Tahoma, sans-serif" },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', textAlign: 'center' },
  header: { marginBottom: '20px' },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#00d09c', margin: 0 },
  subtitle: { fontSize: '18px', color: '#444', fontWeight: '600', marginTop: '5px' },
  infoText: { fontSize: '14px', color: '#666', lineHeight: '1.5', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#444' },
  phoneInputWrapper: { display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' },
  countryCode: { padding: '12px', backgroundColor: '#f5f5f5', borderRight: '1px solid #ddd', color: '#666', fontWeight: 'bold' },
  input: { padding: '12px', border: 'none', fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  footer: { marginTop: '25px' },
  backLink: { color: '#666', fontSize: '14px', textDecoration: 'none', fontWeight: '600' }
};

export default ForgotPassword;