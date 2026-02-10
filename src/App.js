import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import Home from './pages/Home.js';
import Booking from './pages/Booking.js';
import Patient from './pages/Patient.js';
import Payment from './pages/Payment.js';
import Success from './pages/Success.js';
import Failure from './pages/Failure.js';
import History from './pages/History.js';
import './styles.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
