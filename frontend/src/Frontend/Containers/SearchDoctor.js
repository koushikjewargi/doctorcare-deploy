import React from 'react';

const SearchDoctor = () => {
  const categories = ["All", "Cardiology", "Dental", "Neurology"];

  return (
    <div style={styles.container}>
      <div style={styles.searchHeader}>
        <input type="text" placeholder="Search by name or specialty..." style={styles.input} />
      </div>
      <div style={styles.categoryRow}>
        {categories.map(cat => (
          <button key={cat} style={cat === "All" ? styles.catBtnActive : styles.catBtn}>{cat}</button>
        ))}
      </div>
      <div style={styles.placeholder}>
        <p>Results will appear here...</p>
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '20px 5%', backgroundColor: '#fff', minHeight: '80vh' },
  input: { width: '100%', padding: '15px 25px', borderRadius: '50px', border: '1px solid #eee', backgroundColor: '#f1f3f4', outline: 'none' },
  categoryRow: { display: 'flex', gap: '10px', marginTop: '20px', overflowX: 'auto' },
  catBtn: { padding: '8px 20px', borderRadius: '20px', border: '1px solid #00d09c', color: '#00d09c', backgroundColor: '#fff' },
  catBtnActive: { padding: '8px 20px', borderRadius: '20px', border: 'none', backgroundColor: '#00d09c', color: '#fff' },
  placeholder: { marginTop: '50px', textAlign: 'center', color: '#ccc' }
};

export default SearchDoctor;