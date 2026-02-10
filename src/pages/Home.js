import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="main-content">
      <div className="home-stack">
        <h1 className="home-title">Diagnostics Tests</h1>
        <div className="card home-card">
          <h3>Full Body Checkup</h3>
          <button 
            className="btn-book" 
            onClick={() => navigate('/booking')}
          >
            Book Now
          </button>
        </div>
      </div>
    </main>
  );
}
