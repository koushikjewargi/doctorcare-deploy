import React, { useState } from "react";
import { Star, Send, CheckCircle2, User, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [role, setRole] = useState("Patient");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In real app, we send this to backend
    setTimeout(() => {
      navigate("/menu"); // Go back home after 2 seconds
    }, 2000);
  };

  if (submitted) {
    return (
      <div style={styles.container}>
        <div style={styles.successCard}>
          <CheckCircle2 size={64} color="#00d09c" style={{ marginBottom: '20px' }} />
          <h2 style={styles.successTitle}>Thank You!</h2>
          <p style={styles.subtitle}>Your feedback helps us improve Doctor Plus+.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>We Value Your Feedback</h1>
          <p style={styles.subtitle}>Tell us about your experience</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Role Selection */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>I am a...</label>
            <div style={styles.roleContainer}>
              {['Patient', 'Doctor'].map((r) => (
                <div 
                  key={r}
                  onClick={() => setRole(r)}
                  style={role === r ? styles.roleActive : styles.roleInactive}
                >
                  <User size={16} /> {r}
                </div>
              ))}
            </div>
          </div>

          {/* Star Rating */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Rate your experience</label>
            <div style={styles.starContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  fill={star <= (hover || rating) ? "#fbbf24" : "none"}
                  color={star <= (hover || rating) ? "#fbbf24" : "#cbd5e1"}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Message Box */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Your Message</label>
            <div style={{ position: 'relative' }}>
              <MessageSquare size={18} style={styles.iconOverlay} />
              <textarea
                required
                rows="4"
                placeholder="What did you like? What can we improve?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={styles.textarea}
              />
            </div>
          </div>

          <button type="submit" style={styles.button}>
            <Send size={18} /> Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 140px)', // Fits between header/footer
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f8fafc', padding: '20px'
  },
  card: {
    backgroundColor: '#fff', borderRadius: '24px', padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px'
  },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' },
  subtitle: { fontSize: '14px', color: '#64748b' },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#334155' },
  
  roleContainer: { display: 'flex', gap: '10px' },
  roleActive: {
    flex: 1, padding: '12px', borderRadius: '12px', border: '2px solid #00d09c',
    backgroundColor: 'rgba(0, 208, 156, 0.1)', color: '#00d09c', fontWeight: '600',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
  },
  roleInactive: {
    flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0',
    backgroundColor: '#fff', color: '#64748b',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
  },
  
  starContainer: { display: 'flex', gap: '8px', justifyContent: 'center' },
  
  textarea: {
    width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px',
    border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none',
    fontFamily: "'Inter', sans-serif", resize: 'none', boxSizing: 'border-box'
  },
  iconOverlay: {
    position: 'absolute', top: '14px', left: '12px', color: '#94a3b8'
  },
  
  button: {
    padding: '14px', borderRadius: '12px', border: 'none', backgroundColor: '#00d09c',
    color: '#fff', fontWeight: '700', fontSize: '16px', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
    boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)', transition: 'transform 0.2s'
  },
  
  successCard: { textAlign: 'center', animation: 'fadeIn 0.5s ease' },
  successTitle: { fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }
};

export default Feedback;