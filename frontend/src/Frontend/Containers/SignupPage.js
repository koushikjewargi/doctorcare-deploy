import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/otp', { state: { flow: 'signup', mobile: formData.mobile } });
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Join Doctor Plus+</h2>
        <p style={styles.subtitle}>Create an account to book appointments</p>
        
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Koushik Jewargi" 
              style={styles.input} 
              required 
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mobile Number</label>
            <input 
              type="tel" 
              placeholder="9876543210" 
              style={styles.input} 
              required 
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Create Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              <span style={styles.showToggle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
            {error && <p style={styles.errorText}>{error}</p>}
          </div>
          
          <div style={styles.buttonWrapper}>
            <button type="submit" style={styles.primaryBtn} disabled={loading}>
              {loading ? <div style={styles.spinner}></div> : "Create Account"}
            </button>
          </div>
        </form>

        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.signupLink}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    minHeight: '100vh', 
    width: '100%', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundImage: 'url("https://images.unsplash.com/photo-1505751172107-573225a463be?auto=format&fit=crop&w=1920&q=80")', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    position: 'relative', 
    padding: '20px', // Prevents sticking to edges on mobile
    boxSizing: 'border-box'
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { 
    position: 'relative', 
    zIndex: 2, 
    width: '100%', 
    maxWidth: '420px', 
    padding: 'clamp(20px, 5vw, 40px)', // Responsive padding
    backgroundColor: 'rgba(255, 255, 255, 0.98)', 
    borderRadius: '28px', 
    textAlign: 'center', 
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    overflowY: 'auto' // Vertical scroll for small phones
  },
  title: { fontSize: 'clamp(22px, 6vw, 28px)', fontWeight: '800', color: '#00d09c', marginBottom: '10px' },
  subtitle: { fontSize: '14px', color: '#666', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555', marginLeft: '4px' },
  input: { padding: '12px', borderRadius: '12px', border: '1px solid #e0e0e0', width: '100%', boxSizing: 'border-box', fontSize: '15px', outline: 'none', backgroundColor: '#f9f9f9' },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  showToggle: { position: 'absolute', right: '15px', color: '#00d09c', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' },
  errorText: { color: '#ff4d4d', fontSize: '12px', marginTop: '4px', fontWeight: '500' },
  buttonWrapper: { display: 'flex', justifyContent: 'center', marginTop: '10px' },
  primaryBtn: { backgroundColor: '#00d09c', color: '#fff', padding: '14px 40px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', width: '100%', maxWidth: '280px', display: 'flex', justifyContent: 'center' },
  spinner: { width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  footer: { marginTop: '25px', fontSize: '14px', color: '#666' },
  signupLink: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold' }
};

export default SignupPage;