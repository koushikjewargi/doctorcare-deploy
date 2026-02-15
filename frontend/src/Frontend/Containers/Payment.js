import React from 'react';

const Payment = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Secure Payment</h3>
        <div style={styles.amountBox}>Total: <span style={{color: '#00d09c'}}>₹1,500</span></div>
        <div style={styles.inputGroup}>
          <label>Card Number</label>
          <input type="text" placeholder="xxxx xxxx xxxx xxxx" style={styles.input} />
        </div>
        <button style={styles.payBtn}>Pay Now</button>
      </div>
    </div>
  );
};

const styles = {
  container: { paddingTop: '100px', minHeight: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: '#f4f7f6', padding: '0 20px' },
  card: { backgroundColor: '#fff', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center' },
  amountBox: { fontSize: '24px', fontWeight: 'bold', margin: '20px 0' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' },
  payBtn: { width: '100%', backgroundColor: '#00d09c', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 'bold', marginTop: '10px' }
};

export default Payment;