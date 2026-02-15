import React from "react";
import { Link } from "react-router-dom";
import { Users, Calendar, Activity, TrendingUp, AlertTriangle, ArrowUpRight } from "lucide-react";

const AdminDashboard = () => {
  // Mock Data (Same as Vibe)
  const stats = [
    { icon: Users, label: "Total Doctors", value: "24", change: "+3" },
    { icon: Users, label: "Total Patients", value: "1,284", change: "+12%" },
    { icon: Calendar, label: "Appointments Today", value: "47", change: "+8" },
    { icon: Activity, label: "System Health", value: "99.9%", change: "Stable" },
  ];

  const doctors = [
    { name: "Dr. Sarah Wilson", specialty: "Cardiologist", status: "Active", patients: "48" },
    { name: "Dr. James Chen", specialty: "Neurologist", status: "Active", patients: "35" },
    { name: "Dr. Emily Davis", specialty: "Pediatrician", status: "On Leave", patients: "62" },
  ];

  return (
    <div style={styles.container}>
      
      {/* Alert Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerIconBox}>
          <AlertTriangle size={16} color="#fff" />
        </div>
        <p style={styles.bannerText}>Admin Mode — Full system access enabled. Handle with care.</p>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <p style={styles.subTitle}>ADMINISTRATION</p>
        <h1 style={styles.title}>Admin Dashboard</h1>
        <p style={styles.desc}>Overview of your healthcare platform</p>
      </div>

      {/* Stats Grid */}
      <div style={styles.grid}>
        {stats.map(({ icon: Icon, label, value, change }) => (
          <div key={label} style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={styles.iconBox}>
                <Icon size={20} color="#00d09c" />
              </div>
              <span style={styles.badge}>
                <TrendingUp size={12} /> {change}
              </span>
            </div>
            <p style={styles.statValue}>{value}</p>
            <p style={styles.statLabel}>{label}</p>
          </div>
        ))}
      </div>

      {/* Doctors Table Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Manage Doctors</h2>
          <Link to="/search-doctor" style={styles.link}>View All <ArrowUpRight size={14}/></Link>
        </div>
        
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.theadRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Specialty</th>
                <th style={styles.th}>Patients</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d, i) => (
                <tr key={i} style={styles.tr}>
                  <td style={styles.tdBold}>{d.name}</td>
                  <td style={styles.td}>{d.specialty}</td>
                  <td style={styles.td}>{d.patients}</td>
                  <td style={styles.td}>
                    <span style={d.status === "Active" ? styles.statusActive : styles.statusInactive}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- STYLES (Converted from Tailwind to CSS) ---
const styles = {
  container: { padding: '40px 5%', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
  banner: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)", borderRadius: '16px', padding: '16px',
    display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', boxShadow: '0 4px 12px rgba(245, 158, 11, 0.2)'
  },
  bannerIconBox: { width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bannerText: { color: '#fff', fontWeight: '600', fontSize: '14px' },
  
  header: { marginBottom: '40px' },
  subTitle: { fontSize: '12px', fontWeight: '700', color: '#00d09c', letterSpacing: '1px', marginBottom: '8px' },
  title: { fontSize: '36px', fontWeight: '900', color: '#1e293b', margin: '0 0 8px 0' },
  desc: { color: '#64748b', fontSize: '14px' },

  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '50px' },
  statCard: { backgroundColor: '#fff', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  statHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '16px' },
  iconBox: { width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(0, 208, 156, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  badge: { fontSize: '12px', fontWeight: '600', color: '#00d09c', display: 'flex', alignItems: 'center', gap: '4px' },
  statValue: { fontSize: '32px', fontWeight: '800', color: '#1e293b', margin: 0 },
  statLabel: { fontSize: '13px', color: '#64748b', marginTop: '4px' },

  section: { marginBottom: '40px' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { fontSize: '20px', fontWeight: '800', color: '#1e293b' },
  link: { fontSize: '13px', fontWeight: '600', color: '#00d09c', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' },
  
  tableCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  theadRow: { backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
  th: { padding: '16px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '16px 24px', fontSize: '14px', color: '#64748b' },
  tdBold: { padding: '16px 24px', fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  statusActive: { padding: '6px 12px', borderRadius: '20px', backgroundColor: 'rgba(0, 208, 156, 0.1)', color: '#00d09c', fontSize: '12px', fontWeight: '700' },
  statusInactive: { padding: '6px 12px', borderRadius: '20px', backgroundColor: '#f1f5f9', color: '#64748b', fontSize: '12px', fontWeight: '700' }
};

export default AdminDashboard;