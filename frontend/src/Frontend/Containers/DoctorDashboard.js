import React from "react";
import { Users, Calendar, Clock, TrendingUp } from "lucide-react";

const DoctorDashboard = () => {
  const doctorName = localStorage.getItem("name") || "Dr. Koushik"; // Dynamic Name

  const stats = [
    { icon: Calendar, label: "Today's Appointments", value: "8", change: "+2" },
    { icon: Users, label: "Total Patients", value: "142", change: "+5" },
    { icon: Clock, label: "Pending Reviews", value: "3", change: "-1" },
  ];

  const todayAppts = [
    { name: "John Smith", type: "Checkup", time: "9:00 AM", status: "In-Person" },
    { name: "Emily Chen", type: "Follow-up", time: "11:30 AM", status: "Video Call" },
    { name: "Mark Johnson", type: "Consultation", time: "2:00 PM", status: "In-Person" },
  ];

  return (
    <div style={styles.container}>
      
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.subTitle}>DOCTOR PORTAL</p>
        <h1 style={styles.title}>Welcome, {doctorName}</h1>
        <p style={styles.desc}>Here's your schedule for today</p>
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

      {/* Schedule Section */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Today's Schedule</h2>
        
        <div style={styles.scheduleList}>
          {todayAppts.map((appt, i) => (
            <div key={i} style={styles.apptCard}>
              <div style={styles.timeBox}>
                <span style={styles.time}>{appt.time}</span>
              </div>
              <div style={styles.apptDetails}>
                <h4 style={styles.patientName}>{appt.name}</h4>
                <p style={styles.apptType}>{appt.type}</p>
              </div>
              <div style={styles.statusBox}>
                <span style={appt.status === "Video Call" ? styles.tagVideo : styles.tagPerson}>
                  {appt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

 
const styles = {
  container: { padding: '40px 5%', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" },
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

  sectionTitle: { fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '20px' },
  scheduleList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  apptCard: { 
    display: 'flex', alignItems: 'center', padding: '20px', backgroundColor: '#fff', 
    borderRadius: '16px', border: '1px solid #e2e8f0', transition: 'transform 0.2s', cursor: 'pointer'
  },
  timeBox: { minWidth: '80px', fontWeight: '700', color: '#1e293b' },
  apptDetails: { flex: 1 },
  patientName: { margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  apptType: { margin: 0, fontSize: '13px', color: '#64748b' },
  tagVideo: { padding: '6px 12px', borderRadius: '20px', backgroundColor: '#e0f2fe', color: '#0284c7', fontSize: '12px', fontWeight: '700' },
  tagPerson: { padding: '6px 12px', borderRadius: '20px', backgroundColor: '#f3e8ff', color: '#9333ea', fontSize: '12px', fontWeight: '700' }
};

export default DoctorDashboard;