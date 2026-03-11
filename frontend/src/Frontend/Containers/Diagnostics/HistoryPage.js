import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('diagnosticBookings') || '[]');
    setBookings(stored);
    setLoading(false);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  const cancelBooking = (id) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: 'CANCELLED',
          cancelledAt: new Date().toISOString()
        };
      }
      return b;
    });

    setBookings(updated);
    localStorage.setItem('diagnosticBookings', JSON.stringify(updated));
  };

  const rescheduleBooking = (id) => {
    const booking = bookings.find(b => b.id === id);
    localStorage.setItem('rescheduleFrom', JSON.stringify(booking));
    navigate('/diagnostics/booking');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'CONFIRMED':
        return { bg: '#f0fdf4', border: '#86efac', text: '#166534', icon: '✓' };
      case 'PENDING':
        return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', icon: '⏱' };
      case 'CANCELLED':
        return { bg: '#fee2e2', border: '#fecaca', text: '#991b1b', icon: '✕' };
      default:
        return { bg: '#f3f4f6', border: '#d1d5db', text: '#374151', icon: '?' };
    }
  };

  if (loading) {
    return (
      <main className="center" style={{ padding: '40px 20px' }}>
        <p>Loading bookings...</p>
      </main>
    );
  }

  return (
    <main className="center" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Booking History</h2>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['all', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                padding: '8px 16px',
                background: filter === status ? '#2563eb' : 'white',
                color: filter === status ? 'white' : '#374151',
                border: filter === status ? '2px solid #2563eb' : '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '13px',
                transition: 'all 0.3s ease'
              }}
            >
              {status === 'all' ? 'All Bookings' : status}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {filteredBookings.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '40px 20px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#374151', margin: '0 0 8px 0' }}>No bookings found</p>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {filter === 'all' ? 'You haven\'t made any bookings yet.' : `No ${filter.toLowerCase()} bookings found.`}
              </p>
              <button
                onClick={() => navigate('/diagnostics')}
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Book Now
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => {
              const statusColor = getStatusColor(booking.status);
              return (
                <div key={booking.id} style={{
                  background: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderLeft: `4px solid ${statusColor.border}`,
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '20px',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '8px',
                        background: '#f3f4f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '28px',
                        flexShrink: 0
                      }}>
                        🏥
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#1f2937' }}>
                          {booking.doctor || 'Diagnostics Service'}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
                          <strong>Patient:</strong> {booking.patient}
                        </p>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
                          <strong>Date & Time:</strong> {booking.date} at {booking.time}
                        </p>
                        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
                          <strong>Booking ID:</strong> {booking.id}
                        </p>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '15px',
                      paddingTop: '15px',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Amount</p>
                        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#2563eb', margin: 0 }}>₹{booking.amount}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Payment</p>
                        <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', margin: 0 }}>{booking.paymentMethod}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>Booked On</p>
                        <p style={{ fontSize: '13px', color: '#374151', margin: 0 }}>
                          {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '12px',
                    minWidth: '140px'
                  }}>
                    <div style={{
                      background: statusColor.bg,
                      border: `2px solid ${statusColor.border}`,
                      color: statusColor.text,
                      padding: '8px 12px',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>{statusColor.icon}</span>
                      {booking.status}
                    </div>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      width: '100%'
                    }}>
                      {booking.status === 'CONFIRMED' && (
                        <>
                          <button
                            onClick={() => rescheduleBooking(booking.id)}
                            style={{
                              padding: '8px 12px',
                              background: 'white',
                              color: '#2563eb',
                              border: '1px solid #2563eb',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '12px'
                            }}
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            style={{
                              padding: '8px 12px',
                              background: '#fee2e2',
                              color: '#991b1b',
                              border: '1px solid #fecaca',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                              fontSize: '12px'
                            }}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      {booking.status === 'PENDING' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          style={{
                            padding: '8px 12px',
                            background: '#fee2e2',
                            color: '#991b1b',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '12px'
                          }}
                        >
                          Cancel
                        </button>
                      )}
                      {booking.status === 'CANCELLED' && (
                        <button
                          onClick={() => navigate('/diagnostics')}
                          style={{
                            padding: '8px 12px',
                            background: '#2563eb',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '12px'
                          }}
                        >
                          Book Again
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/diagnostics')}
            style={{
              padding: '12px 30px',
              background: 'white',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
