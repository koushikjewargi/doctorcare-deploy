import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Frontend/Containers/Home';
import LoginPage from './Frontend/Containers/LoginPage';
import SignupPage from './Frontend/Containers/SignupPage';
import OtpPage from './Frontend/Containers/OtpPage';
import ForgotPassword from './Frontend/Containers/ForgotPassword';
import ResetPassword from './Frontend/Containers/ResetPassword';
import Dashboard from './Frontend/Containers/Dashboard';
import DoctorSearch from './Frontend/Containers/DoctorSearch';


const ProtectedDashboard = ({ children }) => {
  const role = localStorage.getItem('role');
  
  // Logic: Only admin or doctor can pass this gate
  if (role === 'admin' || role === 'doctor') {
    return children;
  }

  // Redirect everyone else to Home
  return <Navigate to="/" replace />;
};

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
        <Route path="/search" element={<DoctorSearch />} />
        
       
        <Route 
          path="/dashboard" 
          element={
            <ProtectedDashboard>
              <Dashboard />
            </ProtectedDashboard>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;