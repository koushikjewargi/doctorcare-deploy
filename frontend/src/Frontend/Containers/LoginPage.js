import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(''); // Handles both Email or Phone
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // DUAL-INPUT ROLE DETECTION LOGIC
    let detectedRole = 'patient'; 
    const input = identifier.toLowerCase();

    if (input.includes('admin') || input === '9999999999') {
      detectedRole = 'admin';
    } else if (input.includes('doctor') || input === '8888888888') {
      detectedRole = 'doctor';
    }

    localStorage.setItem('role', detectedRole);

    setTimeout(() => {
      setLoading(false);
      if (detectedRole === 'doctor' || detectedRole === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }, 1500); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Phone Number</label>
            <input 
              type="text" 
              placeholder="Email or 10-digit Mobile" 
              style={styles.input} 
              required 
              disabled={loading}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
                disabled={loading}
              />
              {!loading && (
                <span style={styles.showToggle} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              )}
            </div>
            <div style={styles.forgotWrapper}>
               <Link to="/forgot-password" style={styles.forgotLink}>Forgot password?</Link>
            </div>
          </div>
          
          <div style={styles.buttonWrapper}>
            <button type="submit" style={styles.primaryBtn} disabled={loading}>
              {loading ? <div style={styles.spinner}></div> : "Login"}
            </button>
          </div>
        </form>

        <p style={styles.footer}>
          Not a user? <Link to="/signup" style={styles.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: "'Segoe UI', Roboto, sans-serif" },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '90%', maxWidth: '400px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.98)', borderRadius: '28px', textAlign: 'center', boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' },
  title: { fontSize: '30px', fontWeight: '800', color: '#00d09c', marginBottom: '30px', letterSpacing: '1px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555', marginLeft: '4px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box', fontSize: '15px', outline: 'none', backgroundColor: '#f9f9f9' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  showToggle: { position: 'absolute', right: '15px', color: '#00d09c', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  forgotWrapper: { textAlign: 'right', marginTop: '4px' },
  forgotLink: { fontSize: '12px', color: '#888', textDecoration: 'none', fontWeight: '500' },
  buttonWrapper: { display: 'flex', justifyContent: 'center', marginTop: '10px' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '14px 60px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', boxShadow: '0 8px 20px rgba(0, 208, 156, 0.3)', transition: '0.3s', display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '160px' },
  spinner: { width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  footer: { marginTop: '30px', fontSize: '14px', color: '#666' },
  signupLink: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold', marginLeft: '5px' }
};

export default LoginPage;