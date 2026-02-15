import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Loader2, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      if (email.includes("@")) {
        navigate("/security-questions", { state: { email } });
      } else {
        setError("Please enter a valid email address.");
      }
    }, 1500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <KeyRound size={28} color="#00d09c" />
          </div>
          <h1 style={styles.title}>Forgot Password</h1>
          <p style={styles.subtitle}>Enter your email to start recovery</p>
        </div>

        <div style={styles.glassCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                required
                placeholder="you@email.com"
                style={styles.input}
              />
            </div>

            {error && (
              <div style={styles.errorBanner}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <Loader2 className="animate-spin" size={20} /> Checking...
                </div>
              ) : (
                "Continue"
              )}
            </button>
          </form>

          <div style={styles.footerLink}>
            <Link to="/login" style={styles.backLink}>
              <ArrowLeft size={16} /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    // FIX: Centering
    minHeight: 'calc(100vh - 70px)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f0fdfa', fontFamily: "'Inter', sans-serif", padding: '20px'
  },
  contentWrapper: { width: '100%', maxWidth: '440px', textAlign: 'center' },
  header: { marginBottom: '24px' },
  iconCircle: {
    width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'rgba(0, 208, 156, 0.1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto'
  },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#64748b' },
  
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(24px)',
    borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' },
  input: {
    width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', outline: 'none',
    boxSizing: 'border-box'
  },
  errorBanner: {
    backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '13px', fontWeight: '500',
    padding: '10px', borderRadius: '10px'
  },
  button: {
    width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
    backgroundColor: '#00d09c', color: '#fff', fontWeight: '700', fontSize: '14px',
    cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)'
  },
  buttonDisabled: {
    width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
    backgroundColor: '#94e8d1', color: '#fff', fontWeight: '700', fontSize: '14px',
    cursor: 'not-allowed'
  },
  footerLink: { marginTop: '20px' },
  backLink: {
    textDecoration: 'none', color: '#00d09c', fontSize: '14px', fontWeight: '600',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
  }
};

export default ForgotPassword;