import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const navigate = useNavigate();
  const menuItems = [
    { title: "Search Doctor", icon: "🔍", path: "/search" },
    { title: "Popular Doctors", icon: "🔥", path: "/popular" },
    { title: "Favorite Doctors", icon: "❤️", path: "/favorites" },
    { title: "Medical Records", icon: "📁", path: "/records" },
    { title: "Help Center", icon: "❓", path: "/help" },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Menu</h2>
      <div style={styles.grid}>
        {menuItems.map((item) => (
          <div key={item.title} style={styles.card} onClick={() => navigate(item.path)}>
            <div style={styles.icon}>{item.icon}</div>
            <p style={styles.cardTitle}>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: '40px 5%', backgroundColor: '#f9f9f9', minHeight: '100vh', textAlign: 'center' },
  title: { color: '#333', marginBottom: '30px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px', maxWidth: '600px', margin: '0 auto' },
  card: { backgroundColor: '#fff', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', cursor: 'pointer', transition: '0.3s' },
  icon: { fontSize: '32px', marginBottom: '10px' },
  cardTitle: { fontWeight: '600', color: '#555', fontSize: '14px' }
};

export default MenuPage;