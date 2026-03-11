import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingPage() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 10));
  const [selectedTime, setSelectedTime] = useState('02:00');
  const [selectedReminder, setSelectedReminder] = useState('60');

  const doctors = [
    { name: 'Dr. A Sharma', price: 499, img: 'https://i.ibb.co/WNkDrkf0/Screenshot-2026-02-03-at-4-15-20-PM.png' },
    { name: 'Dr. R Mehta', price: 699, img: 'https://i.ibb.co/pmzCVDy/Screenshot-2026-02-03-at-4-15-04-PM.png' },
    { name: 'Dr. P Iyer', price: 899, img: 'https://i.ibb.co/Pvf691zF/Screenshot-2026-02-03-at-4-14-29-PM.png' }
  ];

  const timeSlots = [
    { time: '10:00', label: '10:00\nAM' },
    { time: '12:00', label: '12:00\nAM' },
    { time: '02:00', label: '02:00\nPM' },
    { time: '03:00', label: '03:00\nPM' },
    { time: '04:00', label: '04:00\nPM' }
  ];

  const reminderOptions = [
    { value: '25', label: '25\nMinit' },
    { value: '40', label: '40\nMinit' },
    { value: '60', label: '60\nMinit' },
    { value: '10', label: '10\nMinit' }
  ];

  const selectSpec = (name, price, img) => {
    setSelectedDoctor({ name, price, img });
  };

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
    const bookingData = {
      doctor: selectedDoctor.name,
      price: selectedDoctor.price,
      date: selectedDate.toDateString(),
      time: selectedTime,
      reminder: selectedReminder
    };
    localStorage.setItem('appointmentData', JSON.stringify(bookingData));
    navigate('/patient');
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

    if (selectedDoctor) {
    return (
      <main className="center appointment-page">

        {/* Selected Doctor Summary */}
        <div className="appointment-section" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={selectedDoctor.img} alt={selectedDoctor.name} style={{ width: 96, height: 96, borderRadius: 12, objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{selectedDoctor.name}</div>
            <div style={{ color: '#10b981', fontWeight: 700, marginTop: 6 }}>₹{selectedDoctor.price}</div>
            <div style={{ marginTop: 10 }}>
              <button className="btn-book" onClick={() => setSelectedDoctor(null)} style={{ background: '#fff', color: '#10b981', border: '2px solid #10b981' }}>Change</button>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="appointment-section">
          <div className="calendar-container">
            <div className="calendar-header">
              <h3>{monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}</h3>
              <div className="calendar-nav">
                <button className="calendar-btn" onClick={prevMonth}>‹</button>
                <button className="calendar-btn" onClick={nextMonth}>›</button>
              </div>
            </div>

            <div className="calendar-weekdays">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
            </div>

            <div className="calendar-days">
              {days.map((day, idx) => (
                <button
                  key={idx}
                  className={`calendar-day ${day === selectedDate.getDate() ? 'active' : ''}`}
                  onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
                  disabled={!day}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Available Time Section */}
        <div className="appointment-section">
          <h4 className="section-title">Available Time</h4>
          <div className="time-slots">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                className={`time-slot ${selectedTime === slot.time ? 'active' : ''}`}
                onClick={() => setSelectedTime(slot.time)}
              >
                <span className="time-text">{slot.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Reminder Section */}
        <div className="appointment-section">
          <h4 className="section-title">Reminder Me Before</h4>
          <div className="reminder-slots">
            {reminderOptions.map((option) => (
              <button
                key={option.value}
                className={`reminder-slot ${selectedReminder === option.value ? 'active' : ''}`}
                onClick={() => setSelectedReminder(option.value)}
              >
                <span className="reminder-text">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm Button */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
        </div>
      </main>
    );
  }

    return (
    <main className="center">
      <h2>Choose Specialist</h2>
      <div className="specialist-grid">
        {doctors.map((doc) => (
          <div key={doc.name} className="specialist-card">
            <img src={doc.img} alt={doc.name} />
            <h4>{doc.name}</h4>
            <p>₹{doc.price}</p>
            <button 
              className="btn-book" 
              onClick={() => selectSpec(doc.name, doc.price, doc.img)}
            >
              Book
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
