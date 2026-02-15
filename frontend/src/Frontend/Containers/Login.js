import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  
  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  
  // Register States
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [sq1, setSq1] = useState(""); 
  const [sq2, setSq2] = useState(""); 
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes("admin")) {
        localStorage.setItem("role", "admin");
        navigate("/admin-dashboard");
      } else if (email.toLowerCase().includes("doctor")) {
        localStorage.setItem("role", "doctor");
        navigate("/doctor-dashboard");
      } else {
        localStorage.setItem("role", "patient");
        navigate("/menu"); 
      }
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("role", "patient"); 
      navigate("/menu"); 
    }, 1500);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        <div style={styles.cardContainer}>
          
          {/* LEFT SIDE: Illustration */}
          {!isMobile && (
            <div style={styles.illustrationSection}>
              <div style={styles.circleOuter}>
                <div style={styles.circleMiddle}>
                  <div style={styles.circleInner}>
                    <span style={styles.logoText}>D+</span>
                  </div>
                </div>
              </div>
              <div style={{...styles.floatIcon, top: '20px', right: '40px'}}>📋</div>
              <div style={{...styles.floatIcon, bottom: '40px', left: '20px'}}>💊</div>
              <div style={{...styles.floatIcon, top: '60px', left: '10px', fontSize: '14px'}}>❤️</div>
            </div>
          )}

          {/* RIGHT SIDE: Form */}
          <div style={isMobile ? styles.formSectionMobile : styles.formSection}>
            <div style={styles.tabHeader}>
                <button 
                    onClick={() => { setActiveTab("login"); setError(""); }}
                    style={activeTab === "login" ? styles.activeTab : styles.inactiveTab}
                >
                Login
                </button>
                <button 
                    onClick={() => { setActiveTab("register"); setError(""); }}
                    style={activeTab === "register" ? styles.activeTab : styles.inactiveTab}
                >
                Register
                </button>
            </div>

            <div style={styles.headerBox}>
              <h2 style={styles.title}>
                {activeTab === "login" ? "Welcome back" : "Join Doctor Plus+"}
              </h2>
              <p style={styles.subtitle}>
                {activeTab === "login" 
                  ? "Role is auto-detected from your email" 
                  : "Create your account to get started"}
              </p>
            </div>

            {error && <div style={styles.errorBanner}>{error}</div>}

            <form onSubmit={activeTab === "login" ? handleLogin : handleRegister} style={styles.form}>
              
              {activeTab === "register" && (
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required style={styles.input} />
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@doctorplus.com" required style={styles.input} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={{position: 'relative'}}>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required style={styles.input} />
                  <span onClick={() => setShowPw(!showPw)} style={styles.eyeIcon}>{showPw ? "👁️" : "🙈"}</span>
                </div>
              </div>

              {activeTab === "register" && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Confirm Password</label>
                    <div style={{position: 'relative'}}>
                      <input type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter password" required style={styles.input} />
                      <span onClick={() => setShowConfirmPw(!showConfirmPw)} style={styles.eyeIcon}>{showConfirmPw ? "👁️" : "🙈"}</span>
                    </div>
                  </div>

                  <div style={styles.securityBox}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                      <span style={{fontSize: '16px'}}>🛡️</span>
                      <span style={styles.secTitle}>Security Questions</span>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Question 1</label>
                      <select value={sq1} onChange={e => setSq1(e.target.value)} required style={styles.select}>
                        <option value="">Select a question...</option>
                        <option>What was your first pet's name?</option>
                        <option>What is your mother's maiden name?</option>
                      </select>
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Question 2</label>
                      <select value={sq2} onChange={e => setSq2(e.target.value)} required style={styles.select}>
                        <option value="">Select a question...</option>
                        <option>What city were you born in?</option>
                        <option>What is your favorite food?</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "login" && (
                <div style={styles.forgotRow}>
                   <label style={{display: 'flex', alignItems: 'center', gap: '5px', fontSize: '13px', color: '#666'}}>
                     <input type="checkbox" /> Remember me
                   </label>
                   <span onClick={() => navigate('/forgot-password')} style={styles.forgotLink}>Forgot Password?</span>
                </div>
              )}

              <button type="submit" disabled={isLoading} style={isLoading ? styles.buttonDisabled : styles.button}>
                {isLoading ? (activeTab === "login" ? "Signing in..." : "Creating...") : (activeTab === "login" ? "Sign In" : "Create Account")}
              </button>
            </form>

            <p style={styles.footerText}>
              By clicking above, you agree to our <span style={{color: '#00d09c', cursor: 'pointer'}}>Terms</span>.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    
    minHeight: 'calc(100vh - 70px)', 
    display: 'flex', 
    flexDirection: 'column', 
    backgroundColor: '#fff', 
    fontFamily: "'Inter', sans-serif",
    justifyContent: 'center',  
    alignItems: 'center',
    padding: '20px'
  },
  contentWrapper: {
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%'
  },
  cardContainer: {
    width: '100%', maxWidth: '900px', display: 'flex', gap: '60px', alignItems: 'center', justifyContent: 'center'
  },
  illustrationSection: {
    flex: 1, height: '320px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  circleOuter: { width: '192px', height: '192px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circleMiddle: { width: '128px', height: '128px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circleInner: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#00d09c', fontSize: '30px', fontWeight: '900' },
  floatIcon: { position: 'absolute', width: '48px', height: '48px', backgroundColor: 'rgba(0, 208, 156, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  
  formSection: {
    flex: 1, maxWidth: '400px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', backgroundColor: '#fff'
  },
  formSectionMobile: {
    width: '100%', maxWidth: '400px', border: 'none', padding: '0' 
  },
  tabHeader: {
    display: 'flex', justifyContent: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px'
  },
  activeTab: {
    padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: '#00d09c', borderBottom: '2px solid #00d09c', background: 'none', border: 'none', borderBottom: '2px solid #00d09c', cursor: 'pointer'
  },
  inactiveTab: {
    padding: '8px 20px', fontSize: '14px', fontWeight: '500', color: '#888', background: 'none', border: 'none', cursor: 'pointer'
  },
  headerBox: { marginBottom: '24px', textAlign: 'center' },
  title: { fontSize: '20px', fontWeight: '700', color: '#000', marginBottom: '4px' },
  subtitle: { fontSize: '13px', color: 'rgba(0,0,0,0.5)' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: 'rgba(0,0,0,0.7)' },
  input: {
    width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '14px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box'
  },
  select: {
    width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '14px', backgroundColor: '#fff', outline: 'none'
  },
  eyeIcon: { position: 'absolute', right: '12px', top: '12px', cursor: 'pointer', opacity: 0.5, fontSize: '14px' },
  
  securityBox: { borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '16px', marginTop: '10px' },
  secTitle: { fontSize: '13px', fontWeight: '600', color: '#000' },
  
  forgotRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' },
  forgotLink: { color: '#00d09c', fontWeight: '500', cursor: 'pointer' },
  
  button: {
    width: '100%', height: '44px', borderRadius: '8px', backgroundColor: '#00d09c', color: '#fff', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 14px rgba(0, 208, 156, 0.35)'
  },
  buttonDisabled: {
    width: '100%', height: '44px', borderRadius: '8px', backgroundColor: '#a0e8d5', color: '#fff', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'not-allowed', marginTop: '10px'
  },
  footerText: { textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'rgba(0,0,0,0.4)' },
  errorBanner: { backgroundColor: '#ffe5e5', color: '#d32f2f', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }
};

export default Login;