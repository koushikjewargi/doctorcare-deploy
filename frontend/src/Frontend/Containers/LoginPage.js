import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Phone number</label>
            <input type="text" placeholder="e.g. 9876543210" style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" style={styles.input} required />
              <span style={styles.showToggle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          
          <div style={styles.buttonWrapper}>
            <button type="submit" style={styles.primaryBtn}>Login</button>
            <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
          </div>
        </form>
        <p style={styles.footer}>Not a user? <Link to="/signup" style={styles.signupLink}>Sign up</Link></p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '90%', maxWidth: '400px', padding: '30px', backgroundColor: '#fff', borderRadius: '20px', textAlign: 'center', boxSizing: 'border-box' },
  title: { fontSize: '32px', color: '#00d09c', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600' },
  input: { padding: '12px', borderRadius: '10px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  showToggle: { position: 'absolute', right: '15px', color: '#00d09c', cursor: 'pointer', fontWeight: 'bold' },
  buttonWrapper: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '12px 30px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' },
  forgotLink: { fontSize: '13px', color: '#666', textDecoration: 'none' },
  footer: { marginTop: '20px' },
  signupLink: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold' }
};
export default LoginPage;