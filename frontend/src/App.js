import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './Frontend/Assets/styles.css';

// --- UTILS ---
import ScrollToTop from './Frontend/Components/ScrollToTop';

// --- COMPONENTS ---
import Header from './Frontend/Components/Header';
import Footer from './Frontend/Components/Footer';

// --- AUTH (Vibe Containers) ---
import Splash from './Frontend/Containers/Splash';
import Onboarding from './Frontend/Containers/Onboarding';
import Login from './Frontend/Containers/Login';
import ForgotPassword from './Frontend/Containers/ForgotPassword';
import SecurityQuestions from './Frontend/Containers/SecurityQuestions';
import ResetPassword from './Frontend/Containers/ResetPassword';

// --- SYSTEM PAGES ---
import Feedback from './Frontend/Containers/Feedback';
import HelpCenter from './Frontend/Containers/HelpCenter';
import NotFound from './Frontend/Containers/NotFound';

// --- DASHBOARDS ---
import Dashboard from './Frontend/Containers/Dashboard';
import AdminDashboard from './Frontend/Containers/AdminDashboard';
import DoctorDashboard from './Frontend/Containers/DoctorDashboard';

// --- PATIENT MODULE ---
import MenuPage from './Frontend/Containers/MenuPage';
import SearchDoctor from './Frontend/Containers/SearchDoctor';
import DoctorSearch from './Frontend/Containers/DoctorSearch';
import DoctorProfile from './Frontend/Containers/DoctorProfile';
import PopularDoctor from './Frontend/Containers/PopularDoctor';
import FavDoctor from './Frontend/Containers/FavDoctor';
import MedicalRecords from './Frontend/Containers/MedicalRecords';
import AddedRecords from './Frontend/Containers/AddedRecords';
import PatientDetails from './Frontend/Containers/PatientDetails';

// --- DIAGNOSTICS ---
import DiagnosticsRoutes from './Frontend/Containers/Diagnostics/Routes';

// 🔒 PROTECTED ROUTE COMPONENT (The Gatekeeper)
const ProtectedRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  
  // If no role is found (not logged in), kick them to Login
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// 🎨 LAYOUT WRAPPER
const Layout = ({ children }) => {
  const location = useLocation();
  
  // HIDE Header/Footer on all these pages:
  const hideLayout = [
    '/', 
    '/onboarding', 
    '/login', 
    '/forgot-password', 
    '/security-questions', 
    '/reset-password'
  ]; 
  
  const showHeaderFooter = !hideLayout.includes(location.pathname);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {showHeaderFooter && <Header />} 
      
      <main style={{ 
        flex: 1, 
        position: 'relative', 
        // Add padding ONLY if header is showing
        paddingTop: showHeaderFooter ? '70px' : '0' 
      }}>
        {children}
      </main>

      {showHeaderFooter && <Footer />}
    </div>
  );
};

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* === PUBLIC ROUTES (No Login Required) === */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/security-questions" element={<SecurityQuestions />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* === PROTECTED ROUTES (Login Required) === */}
          {/* Use ProtectedRoute wrapper for ALL internal pages */}
          
          {/* Patient Pages */}
          <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><DoctorSearch /></ProtectedRoute>} /> 
          <Route path="/search-doctor" element={<ProtectedRoute><SearchDoctor /></ProtectedRoute>} />
          <Route path="/doctor/:id" element={<ProtectedRoute><DoctorProfile /></ProtectedRoute>} />
          <Route path="/popular" element={<ProtectedRoute><PopularDoctor /></ProtectedRoute>} />
          <Route path="/favorites" element={<ProtectedRoute><FavDoctor /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
          <Route path="/added-records" element={<ProtectedRoute><AddedRecords /></ProtectedRoute>} />
          <Route path="/patient-details" element={<ProtectedRoute><PatientDetails /></ProtectedRoute>} />

          {/* Diagnostics Routes */}
          <Route path="/diagnostics/*" element={<DiagnosticsRoutes />} />
          {/* legacy or direct shortcuts for diagnostics pages */}
          <Route path="/booking" element={<Navigate to="/diagnostics/booking" replace />} />
          <Route path="/patient-details" element={<Navigate to="/diagnostics/patient-details" replace />} />
          <Route path="/payment" element={<Navigate to="/diagnostics/payment" replace />} />
          <Route path="/history" element={<Navigate to="/diagnostics/history" replace />} />
          <Route path="/success" element={<Navigate to="/diagnostics/success" replace />} />
          <Route path="/failure" element={<Navigate to="/diagnostics/failure" replace />} />

          {/* System Pages */}
          <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpCenter /></ProtectedRoute>} />

          {/* Dashboards */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;