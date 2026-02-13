import React from 'react';

const PatientDetails = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Patient Profile</h2>
        <span style={styles.idTag}>ID: #KP-2026-001</span>
      </div>
      
      <div style={styles.grid}>
        <div style={styles.infoBox}>
          <h4>General Info</h4>
          <p><strong>Name:</strong> Koushik Jewargi</p>
          <p><strong>Age:</strong> 22 Years</p>
          <p><strong>Blood Group:</strong> O+ Positive</p>
        </div>
        <div style={styles.vitalsBox}>
          <h4>Current Vitals</h4>
          <div style={styles.vitalsGrid}>
            <div style={styles.vitalCard}><p>BP</p><strong>120/80</strong></div>
            <div style={styles.vitalCard}><p>Sugar</p><strong>95 mg/dL</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '30px 5%', backgroundColor: '#fff', minHeight: '80vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '10px' },
  title: { margin: 0, color: '#333' },
  idTag: { color: '#00d09c', fontWeight: 'bold', backgroundColor: '#e6faf5', padding: '5px 15px', borderRadius: '20px', fontSize: '13px' },
  grid: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
  infoBox: { flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '15px' },
  vitalsBox: { flex: '1 1 300px', backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '15px' },
  vitalsGrid: { display: 'flex', gap: '10px', marginTop: '15px' },
  vitalCard: { backgroundColor: '#fff', padding: '15px', borderRadius: '10px', flex: 1, textAlign: 'center', border: '1px solid #eee' }
};

export default PatientDetails;