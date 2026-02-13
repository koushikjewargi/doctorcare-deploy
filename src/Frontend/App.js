import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './Components/components/Sidebar.js';
import Header from './Components/components/Header.js';
import BrandingHeader from './Components/components/BrandingHeader.js';
import Home from './Containers/pages/Home.js';
import Booking from './Containers/pages/Booking.js';
import Patient from './Containers/pages/Patient.js';
import Payment from './Containers/pages/Payment.js';
import Success from './Containers/pages/Success.js';
import Failure from './Containers/pages/Failure.js';
import History from './Containers/pages/History.js';
import './App.css';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname === '/';

  return (
    <div className={showHeader ? 'with-header' : 'no-header'}>
      {showHeader && <Header />}
      <BrandingHeader />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
