import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (bookings.length) {
      setLatest(bookings[bookings.length - 1]);
    }
  }, []);

  return (
    <main className="center">
      <div className="form" style={{ maxWidth: 640 }}>
        <h2>✅ Booking Successful</h2>
        {latest ? (
          <>
            <p style={{ marginTop: 8, color: latest.status === 'CONFIRMED' ? '#065f46' : '#b45404' }}>
              {latest.status === 'CONFIRMED' ? 'Your appointment has been confirmed.' : 'Your appointment is reserved. Please complete payment at the center.'}
            </p>

            <div style={{ marginTop: 18, padding: 18, borderRadius: 10, border: '1px solid #e6f4ea', background: latest.status === 'CONFIRMED' ? '#f6fffb' : '#fff7ed' }}>
              <p><strong>Booking ID:</strong> {latest.id}</p>
              <p><strong>Date:</strong> {latest.date}</p>
              <p><strong>Status:</strong> <span style={{ color: latest.status === 'CONFIRMED' ? '#059669' : '#d97706' }}>{latest.status}</span></p>
              <p><strong>Payment:</strong> {latest.payment || '—'}</p>
              {latest.payment === 'OFFLINE' && latest.status === 'PENDING' && (
                <p style={{ marginTop: 8 }}>Please pay at the center when you arrive. Keep this Booking ID handy.</p>
              )}
              {latest.upi && <p><strong>UPI:</strong> {latest.upi}</p>}
            </div>
          </>
        ) : (
          <p style={{ marginTop: 18 }}>No booking details available.</p>
        )}

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn-book" onClick={() => navigate('/history')}>View Booking History</button>
          <button className="btn-book" onClick={() => navigate('/')}>Back Home</button>
        </div>
      </div>
    </main>
  );
}
