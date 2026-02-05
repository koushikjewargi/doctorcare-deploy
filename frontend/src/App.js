import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Frontend/Containers/Home';
import LoginPage from './Frontend/Containers/LoginPage';
import SignupPage from './Frontend/Containers/SignupPage';
import OtpPage from './Frontend/Containers/OtpPage';
import ForgotPassword from './Frontend/Containers/ForgotPassword';
import ResetPassword from './Frontend/Containers/ResetPassword';
import Dashboard from './Frontend/Containers/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;