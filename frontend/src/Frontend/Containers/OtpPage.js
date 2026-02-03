import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();

  // Handles typing and moving to the next box automatically
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const finalOtp = otp.join('');
    if (finalOtp === "1234") {
      alert("Verification Successful!");
      navigate('/reset-password'); 
    } else {
      alert("Invalid OTP. Try 1234");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <p style={styles.subtitle}>Verification Code</p>
        <p style={styles.infoText}>Please enter the 4-digit code sent to your phone.</p>

        <form onSubmit={handleVerify}>
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={inputRefs[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                style={styles.otpBox}
              />
            ))}
          </div>
          <button type="submit" style={styles.primaryBtn}>Verify & Proceed</button>
        </form>

        <p style={styles.footer}>
          Didn't receive the code? <span style={styles.link}>Resend SMS</span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', fontFamily: 'Segoe UI' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '100%', maxWidth: '380px', padding: '40px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)', textAlign: 'center' },
  title: { fontSize: '30px', fontWeight: 'bold', color: '#00d09c', margin: '0' },
  subtitle: { fontSize: '18px', color: '#333', fontWeight: '600', margin: '10px 0' },
  infoText: { fontSize: '14px', color: '#666', marginBottom: '30px' },
  otpContainer: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', gap: '10px' },
  otpBox: { width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', borderRadius: '12px', border: '2px solid #ddd', backgroundColor: '#fff', outline: 'none', color: '#333', transition: 'border-color 0.3s' },
  primaryBtn: { width: '100%', backgroundColor: '#00d09c', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 208, 156, 0.3)' },
  footer: { marginTop: '25px', fontSize: '14px', color: '#666' },
  link: { color: '#00d09c', textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer' }
};

export default OtpPage;