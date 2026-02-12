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

  const payOffline = (id) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: 'CONFIRMED',
          payment: 'OFFLINE (Paid)'
        };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem('bookings', JSON.stringify(updated));
    alert('Payment marked as received. Booking confirmed.');
  };

  return (
    <main className="center">
      <h2>Booking History</h2>
      <div className="history-list">
        {bookings.length === 0 ? (
          <div className="form">
            <p>No bookings yet</p>
          </div>
        ) : (
          bookings.map(b => (
            <div key={b.id} className="history-card">
              <div className="history-details">
                <div style={{ fontWeight:700 }}>{b.doctor || 'Diagnostics Booking'}</div>
                <div className="history-meta">ID: {b.id} · {b.date}</div>
                <div className="history-meta">Payment: {b.payment || '—'}</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ fontWeight:800, color: b.status === 'CONFIRMED' ? '#059669' : '#d97706' }}>{b.status}</div>
                <div className="history-actions">
                  {b.status !== 'CANCELLED' && (
                    <>
                      <button className="btn-book" onClick={() => cancelBooking(b.id)}>Cancel</button>
                      {b.payment === 'OFFLINE' || b.payment === 'OFFLINE (Paid)' ? (
                        b.status === 'PENDING' ? (
                          <button className="btn-book" onClick={() => payOffline(b.id)} style={{ background: '#0f172a', color:'#fff' }}>Mark Paid</button>
                        ) : null
                      ) : null}
                    </>
                  )}
                  <button className="btn-book" onClick={() => navigate('/')} style={{ background:'#10b981' }}>Book Again</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 18 }}>
        <button className="btn-book" onClick={() => navigate('/')}>Back Home</button>
      </div>
    </main>
  );
}
