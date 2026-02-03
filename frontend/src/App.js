import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Frontend/Containers/Home';
import LoginPage from './Frontend/Containers/LoginPage'; 
import OtpPage from './Frontend/Containers/OtpPage';
import SignupPage from './Frontend/Containers/SignupPage';
import ForgotPassword from './Frontend/Containers/ForgotPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;