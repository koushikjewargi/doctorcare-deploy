import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

export default function SuccessPage() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('diagnosticBookings') || '[]');
    if (bookings.length > 0) {
      setBooking(bookings[bookings.length - 1]);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="center" style={{ padding: '40px 20px' }}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="center" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        {/* Success Animation */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#f0fdf4',
          border: '4px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          fontSize: '50px',
          animation: 'pulse 2s infinite'
        }}>
          ✓
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#166534',
          margin: '0 0 12px 0'
        }}>
          Booking Successful!
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 30px 0'
        }}>
          {booking?.status === 'CONFIRMED'
            ? 'Your appointment has been confirmed. Check your email for details.'
            : 'Your appointment is reserved. You can pay at the center.'}
        </p>

        {/* Booking Details */}
        {booking && (
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '30px 20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
            textAlign: 'left'
          }}>
            <h2 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '2px solid #e5e7eb'
            }}>
              Booking Details
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Booking ID</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0, wordBreak: 'break-all' }}>
                  {booking.id}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Doctor / Service</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {booking.doctor}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Date</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {booking.date}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Time</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {booking.time}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Patient</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                  {booking.patient}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0' }}>Amount</p>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', margin: 0 }}>
                  ₹{booking.amount}
                </p>
              </div>
            </div>

            <div style={{
              paddingTop: '20px',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px'
              }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Payment Method</span>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#1f2937' }}>{booking.paymentMethod}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '13px', color: '#6b7280' }}>Status</span>
                <span style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  color: booking.status === 'CONFIRMED' ? '#10b981' : '#f59e0b',
                  background: booking.status === 'CONFIRMED' ? '#f0fdf4' : '#fef3c7',
                  padding: '4px 12px',
                  borderRadius: '6px'
                }}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div style={{
          background: '#f0fdf4',
          border: '2px solid #86efac',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#166534',
            margin: '0 0 12px 0'
          }}>
            What's Next?
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#166534',
            fontSize: '13px'
          }}>
            <li style={{ marginBottom: '8px' }}>
              Confirmation email has been sent to your registered email address
            </li>
            <li style={{ marginBottom: '8px' }}>
              {booking?.paymentMethod === 'Cash at Center'
                ? 'Please bring your booking ID and payment at the center'
                : 'You will receive a receipt and appointment details shortly'}
            </li>
            <li style={{ marginBottom: '8px' }}>
              Arrive 10 minutes before your appointment time
            </li>
            <li>
              For any queries, contact customer support
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: 'column'
        }}>
          <button
            onClick={() => navigate('/diagnostics/history')}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            View Booking History
          </button>
          <button
            onClick={() => navigate('/diagnostics')}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'white',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
    </main>
  );
}
