import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  return (
    <main className="center">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <div className="form">
        <h2>Payment</h2>

        <div>
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> UPI
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> Card
          </label>
          <br />
          <label>
            <input 
              type="radio" 
              name="pay" 
              value="Offline"
              checked={paymentMethod === 'Offline'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            /> Offline
          </label>
          <br />
          <br />
        </div>

        <button 
          className="btn-book" 
          onClick={() => navigate('/success')}
        >
          Simulate Success
        </button>

        <button 
          className="btn-book" 
          style={{ background: '#ef4444' }}
          onClick={() => navigate('/failure')}
        >
          Simulate Failure
        </button>
      </div>
    </main>
  );
}
