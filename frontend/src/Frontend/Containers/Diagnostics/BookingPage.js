import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../../App.css';

export default function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(location.state?.selectedDoctor || null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [error, setError] = useState('');

  const doctors = [
    { 
      id: 1,
      name: 'Dr. S. K. Sen', 
      specialty: 'Dentist',
      price: 500, 
      image: 'https://i.ibb.co/WNkDrkf0/Screenshot-2026-02-03-at-4-15-20-PM.png',
      rating: 4.8,
      reviews: 142,
      experience: '12 Years'
    },
    { 
      id: 2,
      name: 'Dr. P K Das', 
      specialty: 'General',
      price: 600, 
      image: 'https://i.ibb.co/pmzCVDy/Screenshot-2026-02-03-at-4-15-04-PM.png',
      rating: 4.75,
      reviews: 215,
      experience: '11 Years'
    },
    { 
      id: 3,
      name: 'Dr. Suman Ghosh', 
      specialty: 'Dentist',
      price: 700, 
      image: 'https://i.ibb.co/Pvf691zF/Screenshot-2026-02-03-at-4-14-29-PM.png',
      rating: 4.43,
      reviews: 287,
      experience: '14 Years'
    }
  ];

  const timeSlots = [
    { time: '09:00', label: '09:00 AM' },
    { time: '10:00', label: '10:00 AM' },
    { time: '11:00', label: '11:00 AM' },
    { time: '14:00', label: '02:00 PM' },
    { time: '15:00', label: '03:00 PM' },
    { time: '16:00', label: '04:00 PM' }
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      setError('Please select both date and time');
      return;
    }

    const bookingData = {
      doctor: selectedDoctor.name,
      doctorId: selectedDoctor.id,
      specialty: selectedDoctor.specialty,
      price: selectedDoctor.price,
      image: selectedDoctor.image,
      date: selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      dateObj: selectedDate,
      time: selectedTime,
      rating: selectedDoctor.rating,
      experience: selectedDoctor.experience
    };
    localStorage.setItem('appointmentData', JSON.stringify(bookingData));
    navigate('/diagnostics/patient-details');
  };

  const daysInMonth = getDaysInMonth(selectedDate);
  const firstDay = getFirstDayOfMonth(selectedDate);
  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  if (!selectedDoctor) {
    return (
      <main className="center" style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          {/* Header Section */}
          <section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
              Book Your Health Checkup Online
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>
              Find and book appointments with qualified doctors
            </p>
            <div style={{ maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </section>

          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
            Available Doctors
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {doctors.map((doc) => (
              <div key={doc.id} 
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                onClick={() => setSelectedDoctor(doc)}
              >
                <div style={{
                  height: '200px',
                  background: '#f3f4f6',
                  overflow: 'hidden'
                }}>
                  <img src={doc.image} alt={doc.name} style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }} />
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{doc.name}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>{doc.specialty}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>{doc.experience}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', marginBottom: '12px' }}>
                    <span style={{ color: '#fbbf24' }}>★</span>
                    <span style={{ fontSize: '12px', color: '#6b7280' }}>{doc.rating} ({doc.reviews} reviews)</span>
                  </div>
                  <p style={{ fontSize: '16px', color: '#10b981', fontWeight: 'bold', margin: '8px 0' }}>₹{doc.price}</p>
                  <button 
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Select Doctor
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <section style={{
            background: '#f0fdf4',
            padding: '30px',
            borderRadius: '12px',
            marginTop: '40px',
            borderLeft: '4px solid #10b981'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#166534' }}>
              How It Works
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>1</div>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Select a Doctor</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>2</div>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Choose Date & Time</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>3</div>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Fill Patient Details</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '8px'
                }}>4</div>
                <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Make Payment</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
            padding: '40px',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'white',
            marginTop: '30px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
              Ready to Book?
            </h2>
            <p style={{ fontSize: '16px', marginBottom: '20px' }}>
              Schedule your health checkup with our experienced doctors today
            </p>
            <button
              onClick={() => navigate('/diagnostics')}
              style={{
                padding: '14px 32px',
                background: 'white',
                color: '#2563eb',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Browse All Doctors
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="center" style={{ padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Header Section */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
            Book Your Health Checkup Online
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>
            Find and book appointments with qualified doctors
          </p>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </section>

        {/* Doctor Summary Card */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start'
        }}>
          <img src={selectedDoctor.image} alt={selectedDoctor.name} style={{
            width: '100px',
            height: '100px',
            borderRadius: '10px',
            objectFit: 'cover'
          }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{selectedDoctor.name}</h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>{selectedDoctor.specialty} • {selectedDoctor.experience}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#fbbf24' }}>★</span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{selectedDoctor.rating} ({selectedDoctor.reviews} reviews)</span>
            </div>
            <p style={{ fontSize: '16px', color: '#10b981', fontWeight: 'bold', margin: '8px 0' }}>₹{selectedDoctor.price}</p>
            <button 
              onClick={() => setSelectedDoctor(null)}
              style={{
                padding: '8px 16px',
                background: 'white',
                color: '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              Change Doctor
            </button>
          </div>
        </div>

        {/* Calendar and Time Selection */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Calendar */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <button 
                onClick={prevMonth}
                style={{
                  padding: '8px 12px',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                ← Prev
              </button>
              <button 
                onClick={nextMonth}
                style={{
                  padding: '8px 12px',
                  background: '#e5e7eb',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Next →
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  color: '#6b7280',
                  padding: '8px'
                }}>
                  {day}
                </div>
              ))}
              {days.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (day) {
                      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day));
                    }
                  }}
                  style={{
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    background: day === selectedDate.getDate() && selectedDate.getMonth() === new Date().getMonth() ? '#2563eb' : 'white',
                    color: day === selectedDate.getDate() && selectedDate.getMonth() === new Date().getMonth() ? 'white' : '#374151',
                    borderRadius: '6px',
                    cursor: day ? 'pointer' : 'default',
                    fontWeight: day === selectedDate.getDate() ? 'bold' : 'normal',
                    opacity: day ? 1 : 0
                  }}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>Select Time Slot</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '10px'
            }}>
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  style={{
                    padding: '15px',
                    border: selectedTime === slot.time ? '2px solid #2563eb' : '1px solid #e5e7eb',
                    background: selectedTime === slot.time ? '#eff6ff' : 'white',
                    color: selectedTime === slot.time ? '#2563eb' : '#374151',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {slot.label}
                </button>
              ))}
            </div>
            
            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#f0fdf4',
              borderRadius: '8px',
              borderLeft: '4px solid #10b981'
            }}>
              <p style={{ fontSize: '13px', color: '#166534', margin: 0 }}>
                <strong>Selected Date:</strong> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p style={{ fontSize: '13px', color: '#166534', margin: '8px 0 0 0' }}>
                <strong>Selected Time:</strong> {selectedTime}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            marginBottom: '20px',
            borderLeft: '4px solid #dc2626'
          }}>
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => navigate('/diagnostics')}
            style={{
              padding: '12px 24px',
              background: 'white',
              color: '#2563eb',
              border: '2px solid #2563eb',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '12px 24px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
