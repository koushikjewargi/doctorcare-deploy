import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const navigate = useNavigate();

  const selectSpec = (name, price) => {
    localStorage.setItem('selectedSpecialist', JSON.stringify({ name, price }));
    navigate('/patient');
  };

  return (
    <main className="center">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <h2>Choose Specialist</h2>
      <div className="specialist-grid">
        <div className="specialist-card">
          <img src="https://i.ibb.co/WNkDrkf0/Screenshot-2026-02-03-at-4-15-20-PM.png" alt="Dr. A Sharma Dental" />
          <h4>Dr. A Sharma</h4>
          <p>₹499</p>
          <button 
            className="btn-book" 
            onClick={() => selectSpec('Dr. A Sharma', 499)}
          >
            Book
          </button>
        </div>
        <div className="specialist-card">
          <img src="https://i.ibb.co/pmzCVDy/Screenshot-2026-02-03-at-4-15-04-PM.png" alt="Dr. R Mehta" />
          <h4>Dr. R Mehta</h4>
          <p>₹699</p>
          <button 
            className="btn-book" 
            onClick={() => selectSpec('Dr. R Mehta', 699)}
          >
            Book
          </button>
        </div>
        <div className="specialist-card">
          <img src="https://i.ibb.co/Pvf691zF/Screenshot-2026-02-03-at-4-14-29-PM.png" alt="Dr. P Iyer" />
          <h4>Dr. P Iyer</h4>
          <p>₹899</p>
          <button 
            className="btn-book" 
            onClick={() => selectSpec('Dr. P Iyer', 899)}
          >
            Book
          </button>
        </div>
      </div>
    </main>
  );
}
