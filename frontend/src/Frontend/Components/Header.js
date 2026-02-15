import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, Bell } from "lucide-react";
import AppSidebar from "./AppSidebar"; // Import the new sidebar

const Header = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>
          
          {/* Left: Logo & Menu Trigger */}
          <div style={styles.leftSection}>
            <button onClick={() => setIsSidebarOpen(true)} style={styles.menuBtn}>
              <Menu size={24} />
            </button>
            <div style={styles.brand} onClick={() => navigate('/menu')}>
              <span style={styles.logoText}>D+</span>
              <span style={styles.brandText}>Doctor Plus+</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div style={styles.rightSection}>
            <div style={styles.iconBtn}>
              <Bell size={20} />
              <div style={styles.badge}>2</div>
            </div>
            <div style={styles.profileBtn} onClick={() => navigate('/patient-details')}>
              <div style={styles.avatar}>
                <User size={18} color="#fff" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Render the Sidebar here so it's controlled by the Header */}
      <AppSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

const styles = {
  header: {
    height: "70px", backgroundColor: "rgba(255, 255, 255, 0.9)", backdropFilter: "blur(10px)",
    borderBottom: "1px solid #eee", position: "fixed", top: 0, width: "100%", zIndex: 30
  },
  container: {
    maxWidth: "1200px", margin: "0 auto", height: "100%", display: "flex",
    alignItems: "center", justifyContent: "space-between", padding: "0 20px"
  },
  leftSection: { display: "flex", alignItems: "center", gap: "16px" },
  menuBtn: {
    background: "none", border: "none", cursor: "pointer", color: "#333",
    padding: "8px", borderRadius: "8px", display: "flex", alignItems: "center"
  },
  brand: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" },
  logoText: { color: "#00d09c", fontWeight: "900", fontSize: "24px" },
  brandText: { fontSize: "18px", fontWeight: "bold", color: "#1e293b", letterSpacing: "-0.5px" },
  
  rightSection: { display: "flex", alignItems: "center", gap: "16px" },
  iconBtn: {
    width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#f8fafc",
    display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
    position: "relative", color: "#64748b"
  },
  badge: {
    position: "absolute", top: "8px", right: "8px", width: "8px", height: "8px",
    backgroundColor: "#ef4444", borderRadius: "50%", border: "1px solid #fff"
  },
  profileBtn: { cursor: "pointer" },
  avatar: {
    width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#00d09c",
    display: "flex", alignItems: "center", justifyContent: "center"
  }
};

export default Header; 