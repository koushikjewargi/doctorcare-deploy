import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("User Data:", formData);
    // After signing up, we send them to the OTP page for verification
    navigate('/otp'); 
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="text" 
          placeholder="Full Name" 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          style={{ display: 'block', margin: '10px auto', padding: '10px' }}
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          style={{ display: 'block', margin: '10px auto', padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Create Password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          style={{ display: 'block', margin: '10px auto', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#00d09c', color: 'white', border: 'none' }}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;