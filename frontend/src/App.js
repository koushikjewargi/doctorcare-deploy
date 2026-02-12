import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Component Imports
import Header from './Frontend/Components/Header';
import Footer from './Frontend/Components/Footer';

// Container Imports
import Home from './Frontend/Containers/Home';
import LoginPage from './Frontend/Containers/LoginPage';
import SignupPage from './Frontend/Containers/SignupPage';
import OtpPage from './Frontend/Containers/OtpPage';
import ForgotPassword from './Frontend/Containers/ForgotPassword';
import ResetPassword from './Frontend/Containers/ResetPassword';
import Dashboard from './Frontend/Containers/Dashboard';
import DoctorSearch from './Frontend/Containers/DoctorSearch';
import DoctorProfile from './Frontend/Containers/DoctorProfile';

// Shivu's Module Imports
import MenuPage from './Frontend/Containers/MenuPage';
import SearchDoctor from './Frontend/Containers/SearchDoctor';
import PopularDoctor from './Frontend/Containers/PopularDoctor';
import FavDoctor from './Frontend/Containers/FavDoctor';

const ProtectedDashboard = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === 'admin' || role === 'doctor') {
    return children;
  }
  return <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header /> {/* Professional Global Header */}
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/otp" element={<OtpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/search" element={<DoctorSearch />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            
            {/* Shivu's New Routes */}
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/search-doctor" element={<SearchDoctor />} />
            <Route path="/popular" element={<PopularDoctor />} />
            <Route path="/favorites" element={<FavDoctor />} />

            <Route 
              path="/dashboard" 
              element={
                <ProtectedDashboard>
                  <Dashboard />
                </ProtectedDashboard>
              } 
            />
          </Routes>
        </main>

        <Footer /> {/* Professional Global Footer */}
      </div>
    </Router>
  );
}

export default App;