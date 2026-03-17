import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Home, Search, Calendar, Heart, FileText, 
  Activity, Settings, HelpCircle, X, LogOut, User,
  MessageSquare // <--- IMPORT THIS ICON
} from "lucide-react";

const AppSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/menu" },
    { name: "Find Doctors", icon: <Search size={20} />, path: "/search-doctor" },
    { name: "Appointments", icon: <Calendar size={20} />, path: "/appointments" },
    { name: "Favourites", icon: <Heart size={20} />, path: "/favorites" },
    { name: "Records", icon: <FileText size={20} />, path: "/records" },
    { name: "Diagnostics", icon: <Activity size={20} />, path: "/booking" },
    // --- NEW FEEDBACK LINK ---
    { name: "Feedback", icon: <MessageSquare size={20} />, path: "/feedback" }, 
    // -------------------------
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Help Center", icon: <HelpCircle size={20} />, path: "/help" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("role"); 
    localStorage.clear(); 
    onClose();
    navigate("/login");
  };

  // Function to get the active path considering redirects
  const getActivePath = (pathname) => {
    if (pathname.startsWith('/diagnostics')) return '/booking';
    if (pathname === '/added-records') return '/records';
    return pathname;
  };

  return (
    <>
      <div 
        style={{
          ...styles.overlay,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }} 
        onClick={onClose}
      />

      <div style={{
        ...styles.sidebar,
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}>
        
        <div style={styles.header}>
          <div style={styles.brand}>
            <div style={styles.logoCircle}>D+</div>
            <span style={styles.brandName}>Doctor Plus+</span>
          </div>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <div style={styles.profileSummary}>
          <div style={styles.avatarSmall}>
            <User size={18} color="#fff" />
          </div>
          <div style={styles.profileText}>
            <span style={styles.userName}>My Account</span>
            <span style={styles.userRole}>Patient</span>
          </div>
        </div>

        <div style={styles.menuList}>
          {menuItems.map((item) => {
            const isActive = getActivePath(location.pathname) === item.path;
            return (
              <div 
                key={item.name}
                onClick={() => { navigate(item.path); onClose(); }}
                style={isActive ? styles.menuItemActive : styles.menuItem}
              >
                <span style={isActive ? styles.iconActive : styles.icon}>
                  {item.icon}
                </span>
                <span style={styles.text}>{item.name}</span>
                {isActive && <div style={styles.activeBar} />}
              </div>
            );
          })}
        </div>

        <div style={styles.footer}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

// --- STYLES ---
const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
    zIndex: 40, transition: "opacity 0.3s ease"
  },
  sidebar: {
    position: "fixed", top: 0, left: 0, width: "280px", height: "100%",
    backgroundColor: "#fff", zIndex: 50, transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "4px 0 24px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column"
  },
  header: {
    padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
    borderBottom: "1px solid #f1f5f9"
  },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logoCircle: {
    width: "36px", height: "36px", backgroundColor: "rgba(0, 208, 156, 0.1)",
    color: "#00d09c", borderRadius: "10px", display: "flex", alignItems: "center", 
    justifyContent: "center", fontWeight: "800", fontSize: "16px"
  },
  brandName: { fontSize: "18px", fontWeight: "700", color: "#1e293b", letterSpacing: "-0.5px" },
  closeBtn: { background: "none", border: "none", cursor: "pointer", color: "#64748b", padding: "4px" },
  
  profileSummary: {
    padding: "20px 24px 10px 24px", display: "flex", alignItems: "center", gap: "12px"
  },
  avatarSmall: {
    width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#00d09c",
    display: "flex", alignItems: "center", justifyContent: "center"
  },
  profileText: { display: "flex", flexDirection: "column" },
  userName: { fontSize: "14px", fontWeight: "600", color: "#1e293b" },
  userRole: { fontSize: "12px", color: "#64748b" },

  menuList: { flex: 1, padding: "16px", overflowY: "auto" },
  menuItem: {
    display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px",
    borderRadius: "12px", cursor: "pointer", color: "#64748b", transition: "all 0.2s ease",
    marginBottom: "4px", position: "relative", fontSize: "14px", fontWeight: "500"
  },
  menuItemActive: {
    display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px",
    borderRadius: "12px", cursor: "pointer", color: "#00d09c", 
    backgroundColor: "rgba(0, 208, 156, 0.08)", fontWeight: "600", fontSize: "14px",
    marginBottom: "4px", position: "relative"
  },
  icon: { color: "#94a3b8" },
  iconActive: { color: "#00d09c" },
  text: { flex: 1 },
  activeBar: {
    position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)",
    width: "4px", height: "20px", backgroundColor: "#00d09c", 
    borderTopRightRadius: "4px", borderBottomRightRadius: "4px"
  },
  
  footer: { padding: "20px", borderTop: "1px solid #f1f5f9", backgroundColor: "#f8fafc" },
  logoutBtn: {
    width: "100%", padding: "12px", borderRadius: "10px", border: "1px solid #fee2e2",
    backgroundColor: "#fff", color: "#ef4444", fontWeight: "600", fontSize: "14px",
    display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
    cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  }
};

export default AppSidebar;