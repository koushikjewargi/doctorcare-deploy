import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee } from 'lucide-react';

// icons for methods
import upiIcon from '../Assets/assets/upi.svg';
import visaIcon from '../Assets/assets/visa.svg';

export default function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Cash');
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

  const handleCashPay = () => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const newBooking = { id: Date.now(), date: new Date().toLocaleString(), status: 'PENDING', payment: 'CASH' };
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
              <IndianRupee size={24} strokeWidth={2} />
              <div>Cash</div>
            </div>
            <input type="radio" name="pay" value="Cash" checked={paymentMethod === 'Cash'} onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>

          <label className="payment-method">
            <div className="left">
              <img src={upiIcon} alt="upi" />
              <div>UPI</div>
            </div>
            <input type="radio" name="pay" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
          </label>

          <label className="payment-method">
            <div className="left">
              <img src={visaIcon} alt="visa" />
              <div>Credit Card</div>
            </div>
            <input type="radio" name="pay" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} />
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

        {paymentMethod === 'Cash' && (
          <>
            <div className="form-group">
              <p>Pay with cash at the center. Click Confirm to reserve your appointment and pay in cash upon arrival.</p>
            </div>
            <div className="form-footer">
              <button className="btn-book" onClick={() => navigate('/')}>Cancel</button>
              <button className="btn-book" onClick={handleCashPay} style={{ background: '#0f172a', color: '#fff' }}>Confirm</button>
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
      </div>
    </main>
  );
}
