import React from 'react';
import { useNavigate } from 'react-router-dom';

const doctors = [
  { id: 1, name: "Dr. Sandeep Kumar", spec: "Cardiologist", exp: "12 Years", rating: 4.8, fee: "₹800" },
  { id: 2, name: "Dr. Anjali Rao", spec: "Neurologist", exp: "10 Years", rating: 4.9, fee: "₹1000" },
  { id: 3, name: "Dr. Vikram Singh", spec: "Dentist", exp: "8 Years", rating: 4.7, fee: "₹500" },
  { id: 4, name: "Dr. Meera Iyer", spec: "General Physician", exp: "15 Years", rating: 4.6, fee: "₹600" },
];

const DoctorSearch = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>Find Your Specialist</h2>
        <div style={styles.filterBar}>
          <input type="text" placeholder="Search by name or specialty..." style={styles.searchInput} />
        </div>
      </header>

      <div style={styles.list}>
        {doctors.map((doc) => (
          <div key={doc.id} style={styles.card}>
            <div style={styles.info}>
              <h4 style={styles.docName}>{doc.name}</h4>
              <p style={styles.specText}>{doc.spec} • {doc.exp} Exp</p>
              <p style={styles.ratingText}>⭐ {doc.rating} (120+ reviews)</p>
            </div>
            <div style={styles.action}>
              <span style={styles.feeText}>{doc.fee}</span>
              <button 
                style={styles.bookBtn} 
                onClick={() => navigate(`/doctor/${doc.id}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', backgroundColor: '#f9f9f9', minHeight: '100vh', fontFamily: 'Segoe UI' },
  header: { marginBottom: '30px', textAlign: 'center' },
  title: { color: '#333', fontSize: '28px', fontWeight: 'bold' },
  filterBar: { marginTop: '20px' },
  searchInput: { padding: '12px 25px', width: '100%', maxWidth: '600px', borderRadius: '50px', border: '1px solid #ddd', outline: 'none' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', margin: '0 auto' },
  card: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  docName: { margin: '0 0 5px 0', color: '#333' },
  specText: { margin: '0', color: '#666', fontSize: '14px' },
  ratingText: { margin: '10px 0 0 0', color: '#888', fontSize: '12px' },
  action: { textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px' },
  feeText: { fontWeight: 'bold', fontSize: '18px', color: '#00d09c' },
  bookBtn: { backgroundColor: '#00d09c', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }
};

export default DoctorSearch;