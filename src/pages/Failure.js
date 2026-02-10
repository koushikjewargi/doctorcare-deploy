import { useNavigate } from 'react-router-dom';

export default function Failure() {
  const navigate = useNavigate();

  return (
    <main className="center">
      <h1>Payment Failed</h1>
      <button 
        className="btn-book" 
        onClick={() => navigate('/payment')}
      >
        Try Again
      </button>
    </main>
  );
}
