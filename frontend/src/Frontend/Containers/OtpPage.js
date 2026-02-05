import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const location = useLocation();

  // Read the flow state passed from Signup or ForgotPassword
  const currentFlow = location.state?.flow || 'signup';

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 3) inputRefs[index + 1].current.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.join('') === "1212") {
      alert("Mobile number verified!");
      
      // LOGIC: Check where the user came from
      if (currentFlow === 'forgot') {
        navigate('/reset-password'); // Go to Reset if they forgot password
      } else {
        navigate('/login'); // Go to Login if they just signed up
      }
      
    } else { alert("Invalid OTP."); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.glassCard}>
        <h2 style={styles.title}>Doctor Plus+</h2>
        <p style={styles.subtitle}>Verification Code</p>
        <p style={styles.infoText}>Enter the 4-digit code sent to your phone.</p>
        <form onSubmit={handleVerify}>
          <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <input key={index} type="text" maxLength="1" value={digit} ref={inputRefs[index]} onChange={(e) => handleChange(index, e.target.value)} style={styles.otpBox} />
            ))}
          </div>
          <button type="submit" style={styles.primaryBtn}>Verify & Proceed</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1920&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 },
  glassCard: { position: 'relative', zIndex: 2, width: '90%', maxWidth: '380px', padding: '30px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '24px', textAlign: 'center', boxSizing: 'border-box' },
  title: { fontSize: '30px', fontWeight: 'bold', color: '#00d09c' },
  subtitle: { fontSize: '18px', color: '#333', fontWeight: '600' },
  infoText: { fontSize: '14px', color: '#666', marginBottom: '20px' },
  otpContainer: { display: 'flex', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' },
  otpBox: { width: '20%', height: '50px', fontSize: '24px', textAlign: 'center', borderRadius: '12px', border: '2px solid #ddd' },
  primaryBtn: { width: '100%', backgroundColor: '#00d09c', color: '#fff', padding: '14px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }
};
export default OtpPage;