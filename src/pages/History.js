import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  const cancelBooking = (id) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: 'CANCELLED',
          payment: 'REFUND INITIATED'
        };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    alert('Booking cancelled successfully');
  };

  return (
    <main className="center">
      <h2>Booking History</h2>
      <div id="history">
        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="form" style={{ marginBottom: '12px' }}>
              <p><b>ID:</b> {b.id}</p>
              <p><b>Date:</b> {b.date}</p>
              <p><b>Status:</b> <span id={`status-${b.id}`}>{b.status}</span></p>
              <button 
                className="btn-book" 
                onClick={() => cancelBooking(b.id)}
              >
                Cancel Booking
              </button>
            </div>
          ))
        )}
      </div>

      <button 
        className="btn-book" 
        onClick={() => navigate('/')}
      >
        Back Home
      </button>
    </main>
  );
}
