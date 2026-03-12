import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { icon: "🔍", title: "Find Doctors", desc: "Discover the best doctors near you with verified reviews and ratings." },
  { icon: "🩺", title: "Choose the Best", desc: "Compare specializations, experience, and availability to pick your perfect match." },
  { icon: "📅", title: "Easy Appointment", desc: "Book appointments instantly with just a few taps. No waiting, no hassle." },
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Progress Dots */}
        <div style={styles.dotsContainer}>
          {slides.map((_, i) => (
            <div key={i} style={i === step ? styles.activeDot : styles.dot} />
          ))}
        </div>

        {/* Slide Content */}
        <div style={styles.content}>
          <div style={styles.iconBox}>{slides[step].icon}</div>
          <h2 style={styles.title}>{slides[step].title}</h2>
          <p style={styles.desc}>{slides[step].desc}</p>
        </div>

        {/* Buttons */}
        <div style={styles.footer}>
          {step < 2 ? (
            <>
              <button onClick={() => navigate("/login")} style={styles.skipBtn}>Skip</button>
              <button onClick={() => setStep(step + 1)} style={styles.nextBtn}>Next</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} style={styles.finishBtn}>Get Started</button>
          )}
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: '20px' },
  card: { maxWidth: '400px', width: '100%', textAlign: 'center' },
  dotsContainer: { display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' },
  dot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eee', transition: 'all 0.3s' },
  activeDot: { width: '24px', height: '8px', borderRadius: '4px', backgroundColor: '#00d09c', transition: 'all 0.3s' },
  content: { marginBottom: '50px' },
  iconBox: { width: '100px', height: '100px', backgroundColor: '#e6faf5', borderRadius: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px', margin: '0 auto 30px auto' },
  title: { fontSize: '24px', fontWeight: '800', color: '#333', marginBottom: '10px' },
  desc: { fontSize: '15px', color: '#666', lineHeight: '1.5' },
  footer: { display: 'flex', gap: '15px' },
  skipBtn: { flex: 1, padding: '14px', border: 'none', backgroundColor: '#f0f0f0', color: '#666', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  nextBtn: { flex: 1, padding: '14px', border: 'none', backgroundColor: '#00d09c', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  finishBtn: { width: '100%', padding: '14px', border: 'none', backgroundColor: '#00d09c', color: '#fff', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 8px 20px rgba(0, 208, 156, 0.3)' }
};

export default Onboarding;