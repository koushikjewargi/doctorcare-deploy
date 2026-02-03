import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Fix for Show/Hide logic
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in...", email);
    navigate('/'); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      
      <div style={styles.glassCard}>
        <div style={styles.header}>
          <h2 style={styles.title}>Doctor Plus+</h2>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Phone number</label>
            <input 
              type="text" 
              placeholder="e.g. koushik@example.com" 
              onChange={(e) => setEmail(e.target.value)} 
              style={styles.input} 
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                onChange={(e) => setPassword(e.target.value)} 
                style={styles.input} 
                required
              />
              <span 
                style={styles.showToggle} 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div style={styles.actionRow}>
            <button type="submit" style={styles.primaryBtn}>Login</button>
            <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
          </div>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>OR</span>
          <span style={styles.dividerLine}></span>
        </div>

        <p style={styles.footer}>
          Not a user? <Link to="/signup" style={styles.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

// Clean Professional Styles using your Doctor Plus+ Teal palette
const styles = {
  container: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    zIndex: 1
  },
  glassCard: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    maxWidth: '400px',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)', // Clean white card for professional look
    borderRadius: '20px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    textAlign: 'center'
  },
  header: { marginBottom: '30px' },
  title: { 
    fontSize: '32px', 
    fontWeight: 'bold', 
    color: '#00d09c', // Using your exact Doctor Plus+ Teal color
    margin: 0 
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#444' },
  input: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  showToggle: {
    position: 'absolute',
    right: '15px',
    color: '#00d09c',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    userSelect: 'none'
  },
  actionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  primaryBtn: {
    backgroundColor: '#00d09c', // Consistent Teal Button
    color: '#fff',
    padding: '12px 30px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s'
  },
  forgotLink: { color: '#666', fontSize: '14px', textDecoration: 'none' },
  divider: { display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' },
  dividerLine: { flex: 1, height: '1px', backgroundColor: '#eee' },
  dividerText: { color: '#bbb', fontSize: '12px', fontWeight: 'bold' },
  footer: { textAlign: 'center', fontSize: '15px', color: '#444' },
  signupLink: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold' }
};

export default LoginPage;