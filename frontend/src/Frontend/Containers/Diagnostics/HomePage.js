import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../../App.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: 'Dr. S. K. Sen',
        specialty: 'Dentist',
        experience: '12 Years',
        rating: 4.8,
        reviews: '142',
        image: 'https://i.ibb.co/WNkDrkf0/Screenshot-2026-02-03-at-4-15-20-PM.png',
        price: 500
      },
      {
        id: 2,
        name: 'Dr. P K Das',
        specialty: 'General',
        experience: '11 Years',
        rating: 4.75,
        reviews: '215',
        image: 'https://i.ibb.co/pmzCVDy/Screenshot-2026-02-03-at-4-15-04-PM.png',
        price: 600
      },
      {
        id: 3,
        name: 'Dr. Suman Ghosh',
        specialty: 'Dentist',
        experience: '14 Years',
        rating: 4.43,
        reviews: '287',
        image: 'https://i.ibb.co/Pvf691zF/Screenshot-2026-02-03-at-4-14-29-PM.png',
        price: 700
      }
    ];
    setDoctors(mockDoctors);
    setLoading(false);
  }, []);

  const handleDoctorSelect = (doctor) => {
    navigate('/diagnostics/booking', { state: { selectedDoctor: doctor } });
  };

  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <main className="center" style={{ padding: '40px 20px' }}>Loading...</main>;
  }

  return (
    <main className="center" style={{ padding: '20px' }}>
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {/* Header Section */}
        <section style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
            Book Your Health Checkup Online
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '20px' }}>
            Find and book appointments with qualified doctors
          </p>
          
          {/* Search Bar */}
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </section>

        {/* Doctors List */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', color: '#1f2937' }}>
            Available Doctors
          </h2>
          
          {filteredDoctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No doctors found matching your search
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    height: '200px',
                    background: '#f3f4f6',
                    overflow: 'hidden'
                  }}>
                    <img src={doctor.image} alt={doctor.name} style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }} />
                  </div>
                  
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 8px 0' }}>
                      {doctor.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
                      {doctor.specialty}
                    </p>
                    <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0' }}>
                      {doctor.experience}
                    </p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '12px 0' }}>
                      <span style={{ color: '#fbbf24', fontSize: '14px' }}>★</span>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>
                        {doctor.rating} ({doctor.reviews} reviews)
                      </span>
                    </div>
                    
                    <p style={{ fontSize: '18px', color: '#10b981', fontWeight: 'bold', margin: '12px 0' }}>
                      ₹{doctor.price}
                    </p>
                    
                    <button
                      onClick={() => handleDoctorSelect(doctor)}
                      style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--accent-green)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Info Section */}
        <section style={{
          background: '#f0fdf4',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '40px',
          borderLeft: '4px solid #10b981'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 15px 0', color: '#166534' }}>
            How It Works
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                  color: 'var(--accent-green)',
                marginBottom: '8px'
              }}>1</div>
              <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Select a Doctor</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                  color: 'var(--accent-green)',
                marginBottom: '8px'
              }}>2</div>
              <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Choose Date & Time</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                  color: 'var(--accent-green)',
                marginBottom: '8px'
              }}>3</div>
              <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Fill Patient Details</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '32px',
                fontWeight: 'bold',
                  color: 'var(--accent-green)',
                marginBottom: '8px'
              }}>4</div>
              <p style={{ fontSize: '14px', color: '#166534', margin: 0 }}>Make Payment</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, var(--accent-green) 0%, #065f46 100%)',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '12px' }}>
            Ready to Book?
          </h2>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>
            Schedule your health checkup with our experienced doctors today
          </p>
          <button
            onClick={() => navigate('/diagnostics')}
            style={{
              padding: '14px 32px',
              background: 'white',
              color: 'var(--accent-green)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Browse All Doctors
          </button>
        </section>
      </div>
    </main>
  );
}
