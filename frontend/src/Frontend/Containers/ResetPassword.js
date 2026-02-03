    import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Logic to update the password in the database would go here
    alert("Password updated successfully! Please login with your new password.");
    navigate('/login'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <p style={styles.subtitle}>Set New Password</p>

        <form onSubmit={handleReset} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setNewPassword(e.target.value)} 
              style={styles.input} required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm New Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              style={styles.input} required
            />
          </div>

          <button type="submit" style={styles.primaryBtn}>Update Password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: 'Segoe UI' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '100%', maxWidth: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)', textAlign: 'center' },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#00d09c', margin: '0' },
  subtitle: { fontSize: '18px', color: '#333', fontWeight: '600', margin: '10px 0 25px 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#444' },
  input: { padding: '12px 16px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '12px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }
};

export default ResetPassword;