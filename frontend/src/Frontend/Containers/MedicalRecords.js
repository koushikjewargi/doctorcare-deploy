import React, { useState, useEffect } from 'react';

const MedicalRecords = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(stored);
  }, []);

  const records = [
    { id: 1, date: "10 Feb 2026", doctor: "Dr. Sandeep Kumar", type: "Cardiology", status: "Completed" },
    { id: 2, date: "25 Jan 2026", doctor: "Dr. Anjali Rao", type: "Neurology", status: "Completed" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Details</h2>
      <div style={styles.list}>
        {records.map(rec => (
          <div key={rec.id} style={styles.recordCard}>
            <div style={styles.info}>
              <h4 style={styles.date}>{rec.date}</h4>
              <p style={styles.docName}>{rec.doctor} • {rec.type}</p>
            </div>
            <button style={styles.downloadBtn} onClick={() => alert('Download PDF functionality coming soon')}>📄 Download PDF</button>
          </div>
        ))}
      </div>

      {bookings.length > 0 && (
        <div style={{ marginTop: '40px' }}>
          <h2 style={styles.title}>Booking History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {bookings.map(b => (
              <div key={b.id} style={styles.recordCard}>
                <div style={styles.info}>
                  <h4 style={styles.date}>{new Date(b.date).toLocaleString()}</h4>
                  <p style={styles.docName}>ID: {b.id} • {b.payment || '–'}</p>
                  <p style={styles.docName}>Status: {b.status}</p>
                </div>
                <button style={styles.downloadBtn} onClick={() => alert('Download PDF functionality coming soon')}>📄 Download PDF</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { padding: '30px 5%', backgroundColor: '#f9f9f9', minHeight: '80vh' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '25px', color: '#333' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  recordCard: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  info: { flex: '1 1 200px' },
  date: { margin: 0, color: '#00d09c' },
  docName: { margin: '5px 0 0 0', color: '#666', fontSize: '14px' },
  downloadBtn: { backgroundColor: '#e6faf5', color: '#00d09c', border: '1px solid #00d09c', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }
};

export default MedicalRecords;