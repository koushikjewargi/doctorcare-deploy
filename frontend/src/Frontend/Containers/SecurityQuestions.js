import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Shield, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

const SecurityQuestions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "User";
  const question = "What was your first pet's name?";

  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // MOCK VALIDATION: Require length > 1
    if (answer.trim().length < 2) {
      setError("Please answer the security question.");
      return;
    }

    setLoading(true);

    // SIMULATE CHECK
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1500);
    }, 1000);
  };

  if (success) {
    return (
      <div style={styles.container}>
        <div style={styles.successWrapper}>
          <div style={styles.iconCircleSuccess}>
            <CheckCircle2 size={40} color="#00d09c" />
          </div>
          <h2 style={styles.successTitle}>Identity Verified</h2>
          <p style={styles.subtitle}>Redirecting to reset password...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <Shield size={28} color="#00d09c" />
          </div>
          <h1 style={styles.title}>Security Check</h1>
          <p style={styles.subtitle}>Verify your identity for <b>{email}</b></p>
        </div>

        <div style={styles.glassCard}>
          <form onSubmit={handleSubmit} style={styles.form}>
            
            {/* LOCKED QUESTION */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Security Question</label>
              <div style={styles.lockedInput}>{question}</div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Your Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setError(""); }}
                required
                placeholder="Answer"
                style={styles.input}
              />
            </div>

            <div style={styles.infoBox}>
              <AlertTriangle size={14} color="#854d0e" />
              <span>Answers are case-insensitive.</span>
            </div>

            {error && <div style={styles.errorBanner}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={loading ? styles.buttonDisabled : styles.button}
            >
              {loading ? (
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                  <Loader2 className="animate-spin" size={20} /> Verifying...
                </div>
              ) : (
                "Verify Identity"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdfa', fontFamily: "'Inter', sans-serif", padding: '20px' },
  contentWrapper: { width: '100%', maxWidth: '480px' },
  successWrapper: { textAlign: 'center', animation: 'fadeIn 0.5s ease' },
  header: { textAlign: 'center', marginBottom: '24px' },
  iconCircle: { width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' },
  iconCircleSuccess: { width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  successTitle: { fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#64748b' },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(24px)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  lockedInput: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', color: '#64748b', fontSize: '14px', boxSizing: 'border-box' },
  infoBox: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', backgroundColor: '#fef9c3', borderRadius: '10px', color: '#854d0e', fontSize: '12px', fontWeight: '500' },
  errorBanner: { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '13px', fontWeight: '500', padding: '10px', borderRadius: '10px' },
  button: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#00d09c', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)' },
  buttonDisabled: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#94e8d1', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'not-allowed' }
};

export default SecurityQuestions;