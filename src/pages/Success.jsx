import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Save booking in localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');

    const newBooking = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'CONFIRMED',
      payment: 'SUCCESS'
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, []);

  return (
    <main className="center">
      <h2>✅ Booking Successful</h2>
      <p>Your appointment is confirmed.</p>

      <button 
        className="btn-book" 
        onClick={() => navigate('/history')}
      >
        View Booking History
      </button>
      <button 
        className="btn-book" 
        onClick={() => navigate('/')}
      >
        Back Home
      </button>
    </main>
  );
}
