import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add 'Link' here

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login attempt:", email);
    navigate('/'); 
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Login to Doctor Care</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
      
      {/* ADD THIS PART BELOW */}
      <p style={{ marginTop: '20px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#00d09c' }}>Sign Up here</Link>
      </p>
    </div>
  );
};

const inputStyle = { display: 'block', margin: '10px auto', padding: '10px', width: '250px' };
const btnStyle = { padding: '10px 20px', backgroundColor: '#00d09c', color: 'white', border: 'none', cursor: 'pointer' };

export default LoginPage;