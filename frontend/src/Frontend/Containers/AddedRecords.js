import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddedRecords = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>✅</div>
        <h2 style={styles.title}>Record Added!</h2>
        <p style={styles.text}>Your medical report has been successfully uploaded to the cloud.</p>
        <div style={styles.fileBox}>
          <p style={styles.fileName}>📄 blood_report_feb_2026.pdf</p>
          <span style={styles.fileSize}>1.2 MB</span>
        </div>
        <button style={styles.btn} onClick={() => navigate('/records')}>View All Records</button>
      </div>
    </div>
  );
};

const styles = {
  container: { height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  card: { backgroundColor: '#fff', padding: '40px', borderRadius: '25px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%' },
  icon: { fontSize: '50px', marginBottom: '20px' },
  title: { color: '#333', marginBottom: '10px' },
  text: { color: '#666', fontSize: '14px', marginBottom: '30px' },
  fileBox: { backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '12px', marginBottom: '30px', textAlign: 'left' },
  fileName: { margin: 0, fontWeight: 'bold', fontSize: '14px' },
  fileSize: { fontSize: '12px', color: '#999' },
  btn: { backgroundColor: '#00d09c', color: '#fff', border: 'none', padding: '12px 30px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }
};

export default AddedRecords;