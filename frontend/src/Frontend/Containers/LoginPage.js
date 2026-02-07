import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('patient');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
  
    localStorage.setItem('role', role);

   
    if (role === 'doctor' || role === 'admin') {
      navigate('/dashboard');
    } else {
      navigate('/'); 
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        
        <form onSubmit={handleLogin} style={styles.form}>
        
          <div style={styles.inputGroup}>
            <label style={styles.label}>Login Category</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              style={styles.select}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email or Phone number</label>
            <input type="text" placeholder="e.g. 9876543210" style={styles.input} required />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.passwordWrapper}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                style={styles.input} 
                required 
              />
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

        <p style={styles.footer}>
          Not a user? <Link to="/signup" style={styles.signupLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { 
    height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', 
    backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', 
    backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" 
  },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { 
    position: 'relative', zIndex: 2, width: '90%', maxWidth: '400px', padding: '35px', 
    backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', textAlign: 'center', 
    boxSizing: 'border-box', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' 
  },
  title: { fontSize: '32px', fontWeight: 'bold', color: '#00d09c', marginBottom: '25px' },
  form: { display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'left' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '600', color: '#555' },
  select: { 
    padding: '12px', borderRadius: '10px', border: '1px solid #ddd', 
    fontSize: '15px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' 
  },
  input: { 
    padding: '12px', borderRadius: '10px', border: '1px solid #ddd', 
    width: '100%', boxSizing: 'border-box', fontSize: '15px', outline: 'none' 
  },
  passwordWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  showToggle: { 
    position: 'absolute', right: '15px', color: '#00d09c', 
    cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' 
  },
  buttonWrapper: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  primaryBtn: { 
    backgroundColor: '#00d09c', color: '#fff', padding: '12px 35px', 
    borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' 
  },
  forgotLink: { fontSize: '13px', color: '#666', textDecoration: 'none' },
  footer: { marginTop: '25px', fontSize: '14px', color: '#444' },
  signupLink: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold' }
};

export default LoginPage;