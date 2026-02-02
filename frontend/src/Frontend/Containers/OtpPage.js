import React, { useState } from 'react';

const OtpPage = () => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if(otp === "1234") { // Example "hardcoded" code for testing
      alert("Verified Successfully!");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Enter OTP</h2>
      <p>We sent a 4-digit code to your email.</p>
      <input 
        type="text" 
        maxLength="4" 
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ fontSize: '24px', width: '100px', textAlign: 'center', letterSpacing: '10px' }}
      />
      <br /><br />
      <button onClick={handleVerify} style={{ padding: '10px 20px', backgroundColor: '#00d09c', color: 'white', border: 'none' }}>
        Verify Account
      </button>
    </div>
  );
};

export default OtpPage;