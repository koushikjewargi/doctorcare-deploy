import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, FileText, Activity, 
  Heart, ChevronRight, Stethoscope, Microscope, 
  Clock, Bell, User
} from "lucide-react";

const MenuPage = () => {
  const navigate = useNavigate();

  // Mock Data for "Health Overview"
  const healthStats = [
    { label: "Heart Rate", value: "72 bpm", icon: <Activity size={20} color="#ef4444" />, bg: "#fee2e2" },
    { label: "Blood Pressure", value: "120/80", icon: <Activity size={20} color="#3b82f6" />, bg: "#dbeafe" },
    { label: "Weight", value: "68 kg", icon: <Activity size={20} color="#f59e0b" />, bg: "#fef3c7" },
    { label: "Blood Group", value: "O+", icon: <Activity size={20} color="#10b981" />, bg: "#d1fae5" },
  ];

  // Mock Data for "Upcoming Appointments"
  const appointments = [
    { doctor: "Dr. Sarah Wilson", type: "General Checkup", time: "Tomorrow, 10:00 AM", status: "Confirmed" },
    { doctor: "Dr. James Chen", type: "Dental Cleaning", time: "Feb 24, 4:30 PM", status: "Pending" },
  ];

  return (
    <div style={styles.container}>
      
      {/* 1. Welcome Section */}
      <div style={styles.welcomeSection}>
        <div>
          <h1 style={styles.greeting}>Welcome Back, <span style={{color: '#00d09c'}}>Koushik</span></h1>
          <p style={styles.subGreeting}>Here is your daily health digest.</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.iconBtn}><Bell size={20} /></div>
          <div style={styles.iconBtn} onClick={() => navigate('/patient-details')}><User size={20} /></div>
        </div>
      </div>

      {/* 2. Health Stats Grid */}
      <div style={styles.statsGrid}>
        {healthStats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={{...styles.statIconBox, backgroundColor: stat.bg}}>
              {stat.icon}
            </div>
            <div>
              <p style={styles.statValue}>{stat.value}</p>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.mainLayout}>
        
        {/* LEFT COLUMN: Actions & Banner */}
        <div style={styles.leftColumn}>
          
          {/* 3. Promo Banner (Aditya's Module) */}
          <div style={styles.banner} onClick={() => navigate('/booking')}>
            <div style={styles.bannerContent}>
              <h3 style={styles.bannerTitle}>Book Full Body Checkup</h3>
              <p style={styles.bannerText}>Get accurate reports from top labs near you.</p>
              <button style={styles.bannerBtn}>Book Now <ChevronRight size={14} /></button>
            </div>
            <Microscope size={80} color="rgba(255,255,255,0.2)" style={styles.bannerIcon} />
          </div>

          {/* 4. Quick Actions Grid */}
          <h3 style={styles.sectionTitle}>Quick Actions</h3>
          <div style={styles.actionGrid}>
            <div style={styles.actionCard} onClick={() => navigate('/search-doctor')}>
              <div style={{...styles.actionIcon, backgroundColor: '#e0f2fe', color: '#0284c7'}}><Stethoscope size={24}/></div>
              <span style={styles.actionText}>Find Doctor</span>
            </div>
            <div style={styles.actionCard} onClick={() => navigate('/records')}>
              <div style={{...styles.actionIcon, backgroundColor: '#fef3c7', color: '#d97706'}}><FileText size={24}/></div>
              <span style={styles.actionText}>Records</span>
            </div>
            <div style={styles.actionCard} onClick={() => navigate('/appointments')}>
              <div style={{...styles.actionIcon, backgroundColor: '#f3e8ff', color: '#7c3aed'}}><Calendar size={24}/></div>
              <span style={styles.actionText}>Schedule</span>
            </div>
            <div style={styles.actionCard} onClick={() => navigate('/favorites')}>
              <div style={{...styles.actionIcon, backgroundColor: '#fee2e2', color: '#dc2626'}}><Heart size={24}/></div>
              <span style={styles.actionText}>Favorites</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Upcoming Appointments */}
        <div style={styles.rightColumn}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>Upcoming Appointments</h3>
            <span style={styles.linkText} onClick={() => navigate('/appointments')}>See All</span>
          </div>
          
          <div style={styles.apptList}>
            {appointments.map((appt, i) => (
              <div key={i} style={styles.apptCard}>
                <div style={styles.dateBox}>
                   <span style={styles.dateDay}>{appt.time.split(',')[0]}</span>
                </div>
                <div style={styles.apptDetails}>
                  <h4 style={styles.docName}>{appt.doctor}</h4>
                  <p style={styles.apptType}>{appt.type}</p>
                  <div style={styles.timeRow}>
                    <Clock size={12} color="#94a3b8" />
                    <span style={styles.timeText}>{appt.time.split(', ')[1]}</span>
                  </div>
                </div>
                <span style={appt.status === 'Confirmed' ? styles.statusConfirmed : styles.statusPending}>
                  {appt.status}
                </span>
              </div>
            ))}
            
            {/* Empty State visual if needed */}
            <div style={styles.addApptCard} onClick={() => navigate('/search-doctor')}>
              <div style={styles.plusCircle}>+</div>
              <p style={{fontSize: '13px', fontWeight: '600', color: '#00d09c'}}>Book New Appointment</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    padding: '40px 5%', maxWidth: '1200px', margin: '0 auto', 
    minHeight: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#f8fafc'
  },
  
  // Welcome Section
  welcomeSection: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  greeting: { fontSize: '28px', fontWeight: '800', color: '#1e293b', margin: 0 },
  subGreeting: { fontSize: '14px', color: '#64748b', marginTop: '4px' },
  headerActions: { display: 'flex', gap: '12px' },
  iconBtn: { 
    width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#fff', 
    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', 
    cursor: 'pointer', color: '#64748b', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' 
  },

  // Stats Grid
  statsGrid: { 
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' 
  },
  statCard: { 
    backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0',
    display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  },
  statIconBox: { width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statValue: { fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 },
  statLabel: { fontSize: '13px', color: '#64748b', margin: 0 },

  // Main Layout (2 Columns)
  mainLayout: { display: 'flex', flexWrap: 'wrap', gap: '32px' },
  leftColumn: { flex: 2, minWidth: '300px' },
  rightColumn: { flex: 1.2, minWidth: '300px' },

  // Banner
  banner: { 
    background: 'linear-gradient(135deg, #00d09c 0%, #0eb38a 100%)', borderRadius: '20px', padding: '32px',
    color: '#fff', position: 'relative', overflow: 'hidden', cursor: 'pointer', marginBottom: '32px',
    boxShadow: '0 10px 25px rgba(0, 208, 156, 0.25)'
  },
  bannerContent: { position: 'relative', zIndex: 2 },
  bannerTitle: { fontSize: '24px', fontWeight: '800', marginBottom: '8px' },
  bannerText: { fontSize: '14px', opacity: 0.9, marginBottom: '20px', maxWidth: '300px' },
  bannerBtn: { 
    padding: '10px 20px', backgroundColor: '#fff', color: '#00d09c', borderRadius: '10px',
    border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
  },
  bannerIcon: { position: 'absolute', right: '-10px', bottom: '-10px', transform: 'rotate(-15deg)' },

  // Section Headers
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  sectionTitle: { fontSize: '18px', fontWeight: '700', color: '#1e293b', marginBottom: '16px' },
  linkText: { fontSize: '13px', fontWeight: '600', color: '#00d09c', cursor: 'pointer' },

  // Action Grid
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' },
  actionCard: { 
    backgroundColor: '#fff', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0',
    display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
  },
  actionIcon: { width: '44px', height: '44px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  actionText: { fontSize: '15px', fontWeight: '600', color: '#334155' },

  // Appointments List
  apptList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  apptCard: { 
    backgroundColor: '#fff', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0',
    display: 'flex', alignItems: 'center', gap: '16px'
  },
  dateBox: { 
    backgroundColor: '#f8fafc', padding: '10px 14px', borderRadius: '10px', textAlign: 'center',
    border: '1px solid #e2e8f0'
  },
  dateDay: { display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155' },
  apptDetails: { flex: 1 },
  docName: { fontSize: '15px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' },
  apptType: { fontSize: '13px', color: '#64748b', margin: '0 0 6px 0' },
  timeRow: { display: 'flex', alignItems: 'center', gap: '4px' },
  timeText: { fontSize: '12px', color: '#94a3b8' },
  statusConfirmed: { 
    fontSize: '11px', fontWeight: '700', color: '#10b981', backgroundColor: '#d1fae5', 
    padding: '4px 10px', borderRadius: '20px' 
  },
  statusPending: { 
    fontSize: '11px', fontWeight: '700', color: '#f59e0b', backgroundColor: '#fef3c7', 
    padding: '4px 10px', borderRadius: '20px' 
  },
  
  addApptCard: {
    border: '2px dashed #e2e8f0', borderRadius: '16px', padding: '16px',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    cursor: 'pointer', backgroundColor: '#f8fafc'
  },
  plusCircle: {
    width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#00d09c',
    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
  }
};

export default MenuPage;