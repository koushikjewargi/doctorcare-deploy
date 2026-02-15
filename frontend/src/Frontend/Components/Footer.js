import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  // Links based on your actual App.js routes
  const footerSections = [
    {
      title: "For Patients",
      links: [
        { label: "Home", path: "/menu" },
        { label: "Find Doctors", path: "/search-doctor" },
        { label: "Book Tests", path: "/booking" }, // Aditya's module
        { label: "Medical Records", path: "/records" }, // Shivu's module
      ],
    },
    {
      title: "My Account",
      links: [
        { label: "My Profile", path: "/patient-details" },
        { label: "Favorites", path: "/favorites" },
        { label: "Added Records", path: "/added-records" },
      ],
    },
    {
      title: "For Doctors",
      links: [
        { label: "Doctor Dashboard", path: "/doctor-dashboard" },
        { label: "Admin Dashboard", path: "/admin-dashboard" },
      ],
    },
  ];

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          
          {/* Brand Section */}
          <div style={styles.brandColumn}>
            <div style={styles.logoRow}>
              <div style={styles.logoBox}>D+</div>
              <span style={styles.brandName}>
                Doctor Plus<span style={{color: '#00d09c'}}>+</span>
              </span>
            </div>
            <p style={styles.tagline}>
              Smart healthcare management platform trusted by doctors and patients.
            </p>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section) => (
            <div key={section.title} style={styles.column}>
              <h4 style={styles.heading}>{section.title}</h4>
              <ul style={styles.list}>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} style={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © 2026 Doctor Plus+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- DARK VIBE STYLES ---
const styles = {
  footer: {
    backgroundColor: "hsl(235, 45%, 18%)", // Exact Dark Blue from Vibe Code
    color: "rgba(255, 255, 255, 0.8)",
    padding: "60px 0 30px 0",
    marginTop: "auto",
    fontFamily: "'Inter', sans-serif",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", // Responsive Layout
    gap: "40px",
    marginBottom: "50px",
  },
  brandColumn: {
    paddingRight: "20px",
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "16px",
  },
  logoBox: {
    width: "32px",
    height: "32px",
    backgroundColor: "#00d09c", // Primary Teal
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: "800",
    fontSize: "12px",
  },
  brandName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  tagline: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.4)",
    lineHeight: "1.6",
    maxWidth: "280px",
  },
  column: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "16px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
    color: "rgba(255, 255, 255, 0.55)",
    fontSize: "14px",
    transition: "color 0.2s ease",
    cursor: "pointer",
  },
  bottomBar: {
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "24px",
    textAlign: "center",
  },
  copyright: {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.4)",
  },
};

export default Footer;