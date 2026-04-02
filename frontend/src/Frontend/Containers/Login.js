import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

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
  
  // Security Question & Answer
  const [securityQuestion, setSecurityQuestion] = useState("What was your first pet's name?"); 
  const [securityAnswer, setSecurityAnswer] = useState(""); 
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isValidGmail = (email) => {
    return email.toLowerCase().endsWith("@gmail.com") && email.length > 10;
  };

  // ==========================================
  // UPGRADED: SPRING BOOT LOGIN API CALL
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const cleanEmail = email.toLowerCase();

    try {
      const response = await fetch("https://doctorcare-deploy-production.up.railway.app/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: password })
      });

      if (response.ok) {
        // 1. Read the JSON data Spring Boot just sent us!
        const userData = await response.json(); 
        
        // 2. Grab the exact role from the database
        const userRole = userData.role || "Patient"; 
        
        let targetPath = "/menu"; // Default for patients

        // 3. Route them based on their TRUE role (converted to lowercase to avoid typo bugs)
        const roleCheck = userRole.toLowerCase();
        
        if (roleCheck === "admin") {
            targetPath = "/admin-dashboard";
        } else if (roleCheck === "doctor") {
            targetPath = "/doctor-dashboard";
        }

        // 4. Save their official info to memory
        localStorage.setItem("role", userRole);
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("userEmail", userData.email);
        
        setIsLoading(false);
        navigate(targetPath);

      } else {
        // Backend sent a 401 Error (Wrong password or email)
        const errorText = await response.text();
        setError(errorText || "Invalid email or password.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Cannot connect to server. Is Spring Boot running?");
      setIsLoading(false);
    }
  };

  // ==========================================
  // SPRING BOOT REGISTER API CALL
  // ==========================================
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword || !securityAnswer) {
        setError("All fields are required.");
        return;
    }

    if (!isValidGmail(email)) {
        setError("Please enter a valid @gmail.com address.");
        return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    setIsLoading(true);
    const cleanEmail = email.toLowerCase();

    // Auto-detect role for registration
    let role = "Patient";
    if (cleanEmail.includes("admin")) role = "Admin";
    else if (cleanEmail.includes("doctor")) role = "Doctor";

    const userData = {
      name: name,
      email: cleanEmail,
      password: password,
      role: role,
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer.trim().toLowerCase()
    };

    try {
      const response = await fetch("https://doctorcare-deploy-production.up.railway.app/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        alert(`Account Created Successfully as ${role.toUpperCase()}! You can now log in.`);
        
        // Clear form and switch back to login tab
        setActiveTab("login"); 
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false);
      } else {
        const errorText = await response.text();
        setError(errorText || "Registration failed. Email might already exist.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Register Error:", err);
      setError("Cannot connect to server. Is Spring Boot running?");
      setIsLoading(false);
    }
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
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" style={styles.input} />
                </div>
              )}

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@gmail.com" style={styles.input} />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={{position: 'relative'}}>
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={styles.input} />
                  <span onClick={() => setShowPw(!showPw)} style={styles.eyeIcon}>{showPw ? "👁️" : "🙈"}</span>
                </div>
              </div>

              {activeTab === "register" && (
                <>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Confirm Password</label>
                    <div style={{position: 'relative'}}>
                      <input type={showConfirmPw ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" style={styles.input} />
                      <span onClick={() => setShowConfirmPw(!showConfirmPw)} style={styles.eyeIcon}>{showConfirmPw ? "👁️" : "🙈"}</span>
                    </div>
                  </div>

                  <div style={styles.securityBox}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                      <ShieldCheck size={16} color="#00d09c"/>
                      <span style={styles.secTitle}>Security Question</span>
                    </div>
                    
                    <div style={styles.inputGroup}>
                      <select value={securityQuestion} onChange={e => setSecurityQuestion(e.target.value)} style={styles.select}>
                        <option>What was your first pet's name?</option>
                        <option>What is your mother's maiden name?</option>
                        <option>What city were you born in?</option>
                        <option>What is your favorite food?</option>
                      </select>
                    </div>

                    <div style={{...styles.inputGroup, marginTop: '8px'}}>
                        <input 
                            type="text" 
                            placeholder="Your answer" 
                            value={securityAnswer} 
                            onChange={e => setSecurityAnswer(e.target.value)} 
                            style={styles.input} 
                        />
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
                {isLoading ? (activeTab === "login" ? "Signing in..." : "Creating...") : (activeTab === "login" ? "Sign In" : "Register")}
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
  pageContainer: { minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: "'Inter', sans-serif", justifyContent: 'center', alignItems: 'center', padding: '20px' },
  contentWrapper: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' },
  cardContainer: { width: '100%', maxWidth: '900px', display: 'flex', gap: '60px', alignItems: 'center', justifyContent: 'center' },
  illustrationSection: { flex: 1, height: '320px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circleOuter: { width: '192px', height: '192px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circleMiddle: { width: '128px', height: '128px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  circleInner: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  logoText: { color: '#00d09c', fontSize: '30px', fontWeight: '900' },
  floatIcon: { position: 'absolute', width: '48px', height: '48px', backgroundColor: 'rgba(0, 208, 156, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  formSection: { flex: 1, maxWidth: '400px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', backgroundColor: '#fff' },
  formSectionMobile: { width: '100%', maxWidth: '400px', border: 'none', padding: '0' },
  tabHeader: { display: 'flex', justifyContent: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  activeTab: { padding: '8px 20px', fontSize: '14px', fontWeight: '600', color: '#00d09c', borderBottom: '2px solid #00d09c', background: 'none', border: 'none', cursor: 'pointer' },
  inactiveTab: { padding: '8px 20px', fontSize: '14px', fontWeight: '500', color: '#888', background: 'none', border: 'none', cursor: 'pointer' },
  headerBox: { marginBottom: '24px', textAlign: 'center' },
  title: { fontSize: '20px', fontWeight: '700', color: '#000', marginBottom: '4px' },
  subtitle: { fontSize: '13px', color: 'rgba(0,0,0,0.5)' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: 'rgba(0,0,0,0.7)' },
  input: { width: '100%', height: '44px', padding: '0 16px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '14px', outline: 'none', backgroundColor: '#fff', boxSizing: 'border-box' },
  select: { width: '100%', height: '44px', padding: '0 12px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.15)', fontSize: '14px', backgroundColor: '#fff', outline: 'none' },
  eyeIcon: { position: 'absolute', right: '12px', top: '12px', cursor: 'pointer', opacity: 0.5, fontSize: '14px' },
  securityBox: { borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '16px', marginTop: '10px' },
  secTitle: { fontSize: '13px', fontWeight: '600', color: '#000' },
  forgotRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' },
  forgotLink: { color: '#00d09c', fontWeight: '500', cursor: 'pointer' },
  button: { width: '100%', height: '44px', borderRadius: '8px', backgroundColor: '#00d09c', color: '#fff', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '10px', boxShadow: '0 4px 14px rgba(0, 208, 156, 0.35)' },
  buttonDisabled: { width: '100%', height: '44px', borderRadius: '8px', backgroundColor: '#a0e8d5', color: '#fff', border: 'none', fontWeight: '600', fontSize: '14px', cursor: 'not-allowed', marginTop: '10px' },
  footerText: { textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'rgba(0,0,0,0.4)' },
  errorBanner: { backgroundColor: '#ffe5e5', color: '#d32f2f', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }
};

export default Login;