import { useNavigate } from 'react-router-dom';

export default function FailurePage() {
  const navigate = useNavigate();

  return (
    <main className="center">
      <div className="form" style={{ maxWidth: 640 }}>
        <h2 style={{ color: '#b91c1c' }}>⚠️ Payment Failed</h2>
        <p style={{ marginTop: 8 }}>Unfortunately your payment didn't go through. You can retry or choose another payment method.</p>

        <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
          <button className="btn-book" onClick={() => navigate('/payment')}>Retry Payment</button>
          <button className="btn-book" style={{ background: '#ef4444' }} onClick={() => navigate('/')}>Cancel</button>
        </div>

        <div style={{ marginTop: 18, fontSize: 14, color: '#374151' }}>
          <p>If you continue to face issues, contact support:</p>
          <p><a href="mailto:support@doctorcare.example">support@doctorcare.example</a></p>
        </div>
      </div>
    </main>
  );
}
