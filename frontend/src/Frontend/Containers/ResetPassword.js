import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2, CheckCircle2, Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const navigate = useNavigate();
  // location was previously used to read email from navigation state; not required now

  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getStrength = (p) => {
    if (p.length < 6) return { width: '30%', color: '#ef4444', label: 'Weak' };
    if (p.length < 10) return { width: '60%', color: '#f59e0b', label: 'Medium' };
    return { width: '100%', color: '#00d09c', label: 'Strong' };
  };
  const strength = getStrength(pw);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // --- STRICT VERIFICATION ---
    
    // 1. Check if empty
    if (!pw || !confirm) {
      setError("Please fill in both fields.");
      return;
    }

    // 2. Check Matching
    if (pw !== confirm) {
      setError("Passwords do not match!");
      return;
    }
    
    // 3. Check Length
    if (pw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // SIMULATE RESET
    setLoading(true);
    
    setTimeout(() => {
      // Simulate API call success
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1500);
    }, 1000);
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.iconCircleSuccess}>
             <CheckCircle2 size={40} color="#00d09c" />
          </div>
          <h2 style={styles.successTitle}>Password Updated!</h2>
          <p style={styles.subtitle}>Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconCircle}>
          <Lock size={28} color="#00d09c" />
        </div>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Create a strong new password</p>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <div style={{position: 'relative'}}>
                <input 
                  type={showPw ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={pw} 
                  onChange={e => setPw(e.target.value)} 
                  required 
                  style={styles.input} 
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={styles.eyeBtn}>
                  {showPw ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                </button>
            </div>
            
            {pw && (
                <div style={{marginTop: '8px'}}>
                  <div style={{height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden'}}>
                    <div style={{height: '100%', width: strength.width, backgroundColor: strength.color, transition: 'all 0.3s'}}></div>
                  </div>
                  <p style={{fontSize: '11px', color: strength.color, marginTop: '4px', fontWeight: '600'}}>{strength.label}</p>
                </div>
            )}
          </div>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Confirm Password</label>
            <div style={{position: 'relative'}}>
                <input 
                  type={showConfirm ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={confirm} 
                  onChange={e => setConfirm(e.target.value)} 
                  required 
                  style={styles.input} 
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
                  {showConfirm ? <EyeOff size={18} color="#999" /> : <Eye size={18} color="#999" />}
                </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" },
  card: { backgroundColor: "#fff", padding: "40px", borderRadius: "24px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", width: "100%", maxWidth: "420px", border: "1px solid #f1f5f9", textAlign: "center" },
  iconCircle: { width: "64px", height: "64px", borderRadius: "20px", backgroundColor: "rgba(0, 208, 156, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" },
  iconCircleSuccess: { width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "rgba(0, 208, 156, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" },
  title: { fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "8px" },
  successTitle: { fontSize: "28px", fontWeight: "800", color: "#1e293b", marginBottom: "8px" },
  subtitle: { fontSize: "14px", color: "#64748b", margin: "0 0 30px 0" },
  form: { display: "flex", flexDirection: "column", gap: "20px", textAlign: "left" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#475569", textTransform: "uppercase" },
  input: { width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid #e2e8f0", backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', outline: "none", boxSizing: "border-box" },
  eyeBtn: { position: 'absolute', right: '12px', top: '12px', background: 'none', border: 'none', cursor: 'pointer' },
  button: { width: "100%", padding: "14px", backgroundColor: "#00d09c", color: "white", border: "none", borderRadius: "12px", fontWeight: "700", fontSize: "14px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 12px rgba(0, 208, 156, 0.3)" },
  buttonDisabled: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#94e8d1', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'not-allowed' },
  error: { backgroundColor: "#fee2e2", color: "#ef4444", padding: "12px", borderRadius: "12px", fontSize: "13px", marginBottom: "20px", fontWeight: "500" }
};

export default ResetPassword;