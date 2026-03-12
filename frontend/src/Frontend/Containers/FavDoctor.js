import React from 'react';

const DoctorList = ({ title = "favorite Doctor" }) => {
  const doctors = [
    { name: "Dr. Sandeep Kumar", spec: "Cardiologist", rating: "4.8" },
    { name: "Dr. Anjali Rao", spec: "Neurologist", rating: "4.9" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      {doctors.map((doc, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.info}>
            <h4 style={styles.name}>{doc.name}</h4>
            <p style={styles.spec}>{doc.spec}</p>
            <p style={styles.rating}>⭐ {doc.rating}</p>
          </div>
          <button style={styles.actionBtn}>{title.includes("Fav") ? "❤️" : "View"}</button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '30px 5%', backgroundColor: '#f9f9f9', minHeight: '80vh' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' },
  card: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '15px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' },
  name: { margin: 0, color: '#333' },
  spec: { color: '#00d09c', fontSize: '14px', margin: '5px 0' },
  rating: { fontSize: '12px', color: '#777' },
  actionBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }
};

export default DoctorList;