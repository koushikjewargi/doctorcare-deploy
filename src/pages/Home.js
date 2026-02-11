import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🏠',
      title: 'Free Home Sample Pickup',
      description: 'Get samples collected from your home',
      color: '#5B5FDE'
    },
    {
      icon: '👨‍⚕️',
      title: 'Trusted Medical Labs',
      description: 'Partnered with certified laboratories',
      color: '#FF6B6B'
    },
    {
      icon: '📋',
      title: 'E-Reports in 24-72 Hours',
      description: 'Get digital reports quickly',
      color: '#FFA500'
    },
    {
      icon: '👨‍⚕️',
      title: 'Free Follow-up with Doctor',
      description: 'Expert consultation included',
      color: '#10B981'
    }
  ];

  const offers = [
    {
      percent: '45%',
      description: 'Off on Full Body Checkup'
    },
    {
      percent: '10%',
      description: 'Healthcash Back on all tests'
    }
  ];

  return (
    <main className="main-content home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Get Full Body Health Checkups</h1>
          <p className="hero-subtitle">From the comfort of your home.</p>
          
          <div className="offers-banner">
            {offers.map((offer, idx) => (
              <div key={idx} className="offer-item">
                <span className="offer-percent">{offer.percent}</span>
                <span className="offer-text">{offer.description}</span>
              </div>
            ))}
          </div>

          <button 
            className="btn-book btn-large" 
            onClick={() => navigate('/booking')}
          >
            Book Appointment Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose DoctorCare Online?</h2>
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card" style={{ '--card-color': feature.color }}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Old Card */}
      <section className="booking-section">
        <div className="card home-card">
          <h3>Full Body Checkup Package</h3>
          <p className="package-price">Starting at ₹999</p>
          <button 
            className="btn-book" 
            onClick={() => navigate('/booking')}
          >
            View Details
          </button>
        </div>
      </section>
    </main>
  );
}
