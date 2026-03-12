import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const slots = ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM"];

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back to Search</button>
      
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatar}>🩺</div>
          <div>
            <h2 style={styles.docName}>Dr. Sandeep Kumar (ID: {id})</h2>
            <p style={styles.spec}>Senior Cardiologist • 12 Years Exp</p>
          </div>
        </div>

        <div style={styles.section}>
          <h4>About Doctor</h4>
          <p style={styles.description}>
            Specialized in advanced cardiac care and heart health. Committed to providing 
            personalized treatment plans for all patients.
          </p>
        </div>

        <div style={styles.section}>
          <h4>Available Time Slots</h4>
          <div style={styles.slotGrid}>
            {slots.map(slot => (
              <button 
                key={slot} 
                onClick={() => setSelectedSlot(slot)}
                style={selectedSlot === slot ? styles.slotBtnActive : styles.slotBtn}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button 
          disabled={!selectedSlot}
          style={selectedSlot ? styles.confirmBtn : styles.disabledBtn}
          onClick={() => alert(`Appointment requested for ${selectedSlot}`)}
        >
          {selectedSlot ? `Confirm Appointment for ${selectedSlot}` : "Select a Time Slot"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', backgroundColor: '#f4f7f6', minHeight: '100vh', fontFamily: 'Segoe UI' },
  backBtn: { background: 'none', border: 'none', color: '#00d09c', cursor: 'pointer', fontWeight: 'bold', marginBottom: '20px' },
  profileCard: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', maxWidth: '700px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  header: { display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' },
  avatar: { fontSize: '50px', backgroundColor: '#e6faf5', padding: '20px', borderRadius: '50%' },
  docName: { margin: 0, color: '#333' },
  spec: { color: '#00d09c', fontWeight: '600' },
  section: { marginBottom: '30px' },
  description: { color: '#666', lineHeight: '1.6' },
  slotGrid: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  slotBtn: { padding: '10px 20px', borderRadius: '8px', border: '1px solid #00d09c', color: '#00d09c', backgroundColor: '#fff', cursor: 'pointer' },
  slotBtnActive: { padding: '10px 20px', borderRadius: '8px', border: '1px solid #00d09c', color: '#fff', backgroundColor: '#00d09c', cursor: 'pointer' },
  confirmBtn: { width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#00d09c', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  disabledBtn: { width: '100%', padding: '15px', borderRadius: '10px', border: 'none', backgroundColor: '#ccc', color: '#fff', fontWeight: 'bold', cursor: 'not-allowed' }
};

export default DoctorProfile;