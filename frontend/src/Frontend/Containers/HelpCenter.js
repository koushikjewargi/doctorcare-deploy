import React, { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const faqs = [
  { question: "How do I book an appointment?", answer: "Go to the 'Find Doctors' page, select a doctor, and click 'Book Appointment'. Choose your preferred slot and confirm." },
  { question: "Is my medical data secure?", answer: "Yes, we use industry-standard encryption to ensure your records are private and visible only to you and your authorized doctors." },
  { question: "How can I contact a doctor?", answer: "You can use the 'Chat' feature in the Doctor's profile or wait for your scheduled video consultation." },
  { question: "Can I cancel a booking?", answer: "Yes, go to 'Appointments', select the upcoming booking, and click 'Cancel'. Refunds are processed within 3-5 business days." },
];

const HelpCenter = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '10px' }}>Help Center</h1>
        <p style={{ color: '#64748b' }}>Frequently asked questions and support.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontWeight: '600', color: '#334155', fontSize: '16px' }}>{faq.question}</span>
              {openIndex === index ? <ChevronUp size={20} color="#00d09c" /> : <ChevronDown size={20} color="#94a3b8" />}
            </button>
            {openIndex === index && (
              <div style={{ padding: '0 20px 20px 20px', color: '#64748b', fontSize: '14px', lineHeight: '1.6', borderTop: '1px solid #f1f5f9' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '30px', backgroundColor: '#f0fdfa', borderRadius: '16px' }}>
        <h3 style={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Still need help?</h3>
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>Our support team is available 24/7.</p>
        <button style={{ padding: '12px 24px', backgroundColor: '#fff', border: '1px solid #00d09c', color: '#00d09c', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>Contact Support</button>
      </div>
    </div>
  );
};
export default HelpCenter;