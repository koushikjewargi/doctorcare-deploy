import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { KeyRound, Loader2, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  
  // The 3-Step Process State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ==========================================
  // STEP 1: VERIFY EMAIL & GET QUESTION
  // ==========================================
  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !email.toLowerCase().includes("@gmail.com")) {
       setLoading(false);
       setError("Please enter a valid Gmail address.");
       return;
    }

    try {
      const response = await fetch(`https://doctorcare-deploy-production.up.railway.app/api/users/get-security-question/${email}`);
      if (response.ok) {
        const data = await response.json();
        setSecurityQuestion(data.question);
        setStep(2); // Jump to the question form!
      } else {
        const errorText = await response.text();
        setError(errorText || "Email not found in our system.");
      }
    } catch (err) {
      setError("Cannot connect to server. Is Spring Boot running?");
    }
    setLoading(false);
  };

  // ==========================================
  // STEP 2: VERIFY ANSWER & RESET PASSWORD
  // ==========================================
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (newPassword.length < 6) {
        setError("New password must be at least 6 characters.");
        setLoading(false);
        return;
    }

    try {
      const response = await fetch("https://doctorcare-deploy-production.up.railway.app/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            email: email, 
            securityAnswer: securityAnswer, 
            newPassword: newPassword 
        })
      });

      if (response.ok) {
        const successText = await response.text();
        setMessage(successText);
        setStep(3); // Jump to success screen!
      } else {
        const errorText = await response.text();
        setError(errorText || "Incorrect security answer.");
      }
    } catch (err) {
      setError("Cannot connect to server.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            {step === 3 ? <CheckCircle2 size={28} color="#00d09c" /> : <KeyRound size={28} color="#00d09c" />}
          </div>
          <h1 style={styles.title}>
              {step === 1 && "Forgot Password"}
              {step === 2 && "Security Verification"}
              {step === 3 && "Password Reset"}
          </h1>
          <p style={styles.subtitle}>
              {step === 1 && "Enter your email to start recovery"}
              {step === 2 && "Answer your question to create a new password"}
              {step === 3 && "Your account is secure."}
          </p>
        </div>

        <div style={styles.glassCard}>
          
          {error && <div style={styles.errorBanner}>{error}</div>}
          {message && step !== 3 && <div style={styles.successBanner}>{message}</div>}

          {/* --- UI FOR STEP 1 --- */}
          {step === 1 && (
              <form onSubmit={handleVerifyEmail} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    required
                    placeholder="you@gmail.com"
                    style={styles.input}
                  />
                </div>

                <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                  {loading ? <div style={styles.loadingBox}><Loader2 className="animate-spin" size={20} /> Checking...</div> : "Continue"}
                </button>
              </form>
          )}

          {/* --- UI FOR STEP 2 --- */}
          {step === 2 && (
              <form onSubmit={handleResetPassword} style={styles.form}>
                <div style={styles.securityBox}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px'}}>
                        <ShieldCheck size={16} color="#00d09c"/>
                        <span style={styles.secTitle}>Security Question</span>
                    </div>
                    <p style={{fontSize: '14px', fontWeight: '500', color: '#1e293b', marginBottom: '10px'}}>{securityQuestion}</p>
                    <input 
                        type="text" 
                        value={securityAnswer} 
                        onChange={e => setSecurityAnswer(e.target.value)} 
                        required 
                        placeholder="Your Answer" 
                        style={styles.input} 
                    />
                </div>

                <div style={{...styles.inputGroup, marginTop: '10px'}}>
                  <label style={styles.label}>New Password</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => { setNewPassword(e.target.value); setError(""); }}
                    required
                    placeholder="••••••••"
                    style={styles.input}
                  />
                </div>

                <button type="submit" disabled={loading} style={loading ? styles.buttonDisabled : styles.button}>
                  {loading ? <div style={styles.loadingBox}><Loader2 className="animate-spin" size={20} /> Resetting...</div> : "Reset Password"}
                </button>
              </form>
          )}

          {/* --- UI FOR STEP 3 --- */}
          {step === 3 && (
              <button onClick={() => navigate('/login')} style={styles.button}>
                Return to Login
              </button>
          )}

          {step !== 3 && (
              <div style={styles.footerLink}>
                <Link to="/login" style={styles.backLink}>
                  <ArrowLeft size={16} /> Back to Login
                </Link>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Kept your exact styles and added a few tweaks for the new inputs!
const styles = {
  container: { minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0fdfa', fontFamily: "'Inter', sans-serif", padding: '20px' },
  contentWrapper: { width: '100%', maxWidth: '440px', textAlign: 'center' },
  header: { marginBottom: '24px' },
  iconCircle: { width: '64px', height: '64px', borderRadius: '20px', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#64748b' },
  glassCard: { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(24px)', borderRadius: '24px', padding: '32px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { textAlign: 'left' },
  label: { fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px', display: 'block' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' },
  securityBox: { backgroundColor: 'rgba(0, 208, 156, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0, 208, 156, 0.2)', textAlign: 'left' },
  secTitle: { fontSize: '13px', fontWeight: '700', color: '#00d09c' },
  errorBanner: { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '13px', fontWeight: '500', padding: '10px', borderRadius: '10px', marginBottom: '20px' },
  successBanner: { backgroundColor: '#e6f9f0', color: '#00d09c', fontSize: '13px', fontWeight: '600', padding: '10px', borderRadius: '10px', marginBottom: '20px' },
  button: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#00d09c', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)' },
  buttonDisabled: { width: '100%', padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#94e8d1', color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'not-allowed' },
  loadingBox: { display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' },
  footerLink: { marginTop: '20px' },
  backLink: { textDecoration: 'none', color: '#00d09c', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }
};

export default ForgotPassword;