import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Patient from './pages/Patient';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Failure from './pages/Failure';
import History from './pages/History';
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
