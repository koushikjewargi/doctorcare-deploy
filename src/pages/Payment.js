import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [upiId, setUpiId] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [error, setError] = useState('');

  const validateUpi = (id) => typeof id === 'string' && id.includes('@') && !/\s/.test(id);

  const handleAddCard = () => {
    setError('');
    if (!cardHolder.trim()) return setError('Card holder name is required');
    if (!/^[0-9 ]{12,19}$/.test(cardNumber.replace(/ /g, ''))) return setError('Enter valid card number');
    // Simulate success
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = { id: Date.now(), date: new Date().toLocaleString(), status: 'CONFIRMED', payment: 'CARD' };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    navigate('/success');
  };

  const handleUpiPay = () => {
    setError('');
    if (!validateUpi(upiId)) return setError('Please enter a valid UPI ID');
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = { id: Date.now(), date: new Date().toLocaleString(), status: 'CONFIRMED', payment: 'UPI', upi: upiId };
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    navigate('/success');
  };

  return (
    <main className="center">
      <div className="form">
        <h2>Add New Payment Method</h2>

        <div className="payment-methods">
          <label className="payment-method">
            <div className="left">
              <img src="/src/assets/visa.svg" alt="visa" />
              <div>Credit Card</div>
            </div>
            <input type="radio" name="pay" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>

          <label className="payment-method">
            <div className="left">
              <img src="/src/assets/upi.svg" alt="upi" />
              <div>UPI</div>
            </div>
            <input type="radio" name="pay" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>

          <label className="payment-method">
            <div className="left">
              <img src="/src/assets/offline.svg" alt="offline" />
              <div>Offline</div>
            </div>
            <input type="radio" name="pay" value="Offline" checked={paymentMethod === 'Offline'} onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>
        </div>

        <hr />

        {paymentMethod === 'Card' && (
          <>
            <div className="form-group">
              <label>Card Holder Name</label>
              <input value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} placeholder="Enter name here" />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" />
            </div>

            <div className="row">
              <input className="small-input" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
              <input className="small-input" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="CVV" />
            </div>

            <div style={{ marginTop: 12 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} /> Save card securely for future payments
              </label>
            </div>

            {error && <small className="error">{error}</small>}

            <div className="form-footer">
              <button className="btn-book" onClick={() => navigate('/')}>Cancel</button>
              <button className="btn-book" onClick={handleAddCard} style={{ background: '#0f172a', color: '#fff' }}>Add Card</button>
            </div>
          </>
        )}

        {paymentMethod === 'UPI' && (
          <>
            <div className="form-group">
              <label>UPI ID</label>
              <input value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="yourid@bank" />
            </div>
            {error && <small className="error">{error}</small>}
            <div className="form-footer">
              <button className="btn-book" onClick={() => navigate('/')}>Cancel</button>
              <button className="btn-book" onClick={handleUpiPay} style={{ background: '#0f172a', color: '#fff' }}>Pay via UPI</button>
            </div>
          </>
        )}

        {paymentMethod === 'Offline' && (
          <>
            <div className="form-group">
              <p>Choose offline payment at the center. Click Confirm to reserve your appointment and pay at the center.</p>
            </div>
            <div className="form-footer">
              <button className="btn-book" onClick={() => navigate('/')}>Cancel</button>
              <button className="btn-book" onClick={() => {
                const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                const newBooking = { id: Date.now(), date: new Date().toLocaleString(), status: 'PENDING', payment: 'OFFLINE' };
                bookings.push(newBooking);
                localStorage.setItem('bookings', JSON.stringify(bookings));
                navigate('/success');
              }} style={{ background: '#0f172a', color: '#fff' }}>Confirm</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
