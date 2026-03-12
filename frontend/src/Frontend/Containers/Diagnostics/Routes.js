import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import PatientDetailsPage from './PatientDetailsPage';
import PaymentPage from './PaymentPage';
import HistoryPage from './HistoryPage';
import SuccessPage from './SuccessPage';
import FailurePage from './FailurePage';

export default function DiagnosticsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/patient-details" element={<PatientDetailsPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/failure" element={<FailurePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
