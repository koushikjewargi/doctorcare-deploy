import React from 'react';

const Booking = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{color: '#00d09c'}}>Book a Test</h2>
        <p style={{fontSize: '14px', color: '#666'}}>Select your required diagnostic tests below.</p>
        <div style={styles.testList}>
          {['Blood Test', 'X-Ray', 'MRI Scan', 'COVID-19 RT-PCR'].map(test => (
            <div key={test} style={styles.testItem}>
              <span>{test}</span>
              <button style={styles.addBtn}>Add</button>
            </div>
          ))}
        </div>
        <button style={styles.primaryBtn}>Proceed to Payment</button>
      </div>
    </div>
  );
};

const styles = {
  container: { paddingTop: '100px', paddingBottom: '40px', minHeight: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f7f6', paddingLeft: '5%', paddingRight: '5%' },
  card: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' },
  testList: { margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' },
  testItem: { display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid #eee', borderRadius: '10px' },
  addBtn: { color: '#00d09c', border: 'none', background: 'none', fontWeight: 'bold', cursor: 'pointer' },
  primaryBtn: { width: '100%', backgroundColor: '#00d09c', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px' }
};

export default Booking;