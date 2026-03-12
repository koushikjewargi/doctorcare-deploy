import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

export default function PaymentPage() {
  const navigate = useNavigate();
  const appointmentData = JSON.parse(localStorage.getItem('appointmentData') || '{}');
  const patientDetails = JSON.parse(localStorage.getItem('patientDetails') || '{}');

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardChange = (e) => {
    const { id, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [id]: value
    }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const handleUpiChange = (e) => {
    setUpiId(e.target.value);
    if (errors.upiId) {
      setErrors(prev => ({ ...prev, upiId: '' }));
    }
  };

  const validateCardDetails = () => {
    const newErrors = {};
    if (!cardData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }
    if (!cardData.expiryMonth) newErrors.expiryMonth = 'Month is required';
    if (!cardData.expiryYear) newErrors.expiryYear = 'Year is required';
    if (!cardData.cvv || cardData.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUpi = () => {
    const newErrors = {};
    if (!upiId.trim()) {
      newErrors.upiId = 'UPI ID is required';
    } else if (!/^[a-zA-Z0-9.-_]+@[a-zA-Z]{3,}$/.test(upiId)) {
      newErrors.upiId = 'Invalid UPI ID format (e.g., name@bank)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardPayment = async () => {
    if (!validateCardDetails()) return;

    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const booking = {
        id: `DIAG-${Date.now()}`,
        doctor: appointmentData.doctor || 'Diagnostics Service',
        date: appointmentData.date || new Date().toDateString(),
        time: appointmentData.time || '--',
        patient: patientDetails.fullName || 'Patient',
        amount: appointmentData.price || 0,
        paymentMethod: 'Card',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        details: {
          card: cardData.cardNumber.slice(-4),
          email: patientDetails.email
        }
      };

      const bookings = JSON.parse(localStorage.getItem('diagnosticBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('diagnosticBookings', JSON.stringify(bookings));
      
      if (saveCard) {
        localStorage.setItem('savedCard', JSON.stringify({
          cardholderName: cardData.cardholderName,
          cardNumber: cardData.cardNumber,
          lastFour: cardData.cardNumber.slice(-4)
        }));
      }

      navigate('/diagnostics/success');
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpiPayment = async () => {
    if (!validateUpi()) return;

    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const booking = {
        id: `DIAG-${Date.now()}`,
        doctor: appointmentData.doctor || 'Diagnostics Service',
        date: appointmentData.date || new Date().toDateString(),
        time: appointmentData.time || '--',
        patient: patientDetails.fullName || 'Patient',
        amount: appointmentData.price || 0,
        paymentMethod: 'UPI',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        details: {
          upiId: upiId,
          email: patientDetails.email
        }
      };

      const bookings = JSON.parse(localStorage.getItem('diagnosticBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('diagnosticBookings', JSON.stringify(bookings));

      navigate('/diagnostics/success');
    } catch (error) {
      setErrors({ submit: 'Payment failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCashPayment = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const booking = {
        id: `DIAG-${Date.now()}`,
        doctor: appointmentData.doctor || 'Diagnostics Service',
        date: appointmentData.date || new Date().toDateString(),
        time: appointmentData.time || '--',
        patient: patientDetails.fullName || 'Patient',
        amount: appointmentData.price || 0,
        paymentMethod: 'Cash at Center',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        details: {
          email: patientDetails.email
        }
      };

      const bookings = JSON.parse(localStorage.getItem('diagnosticBookings') || '[]');
      bookings.push(booking);
      localStorage.setItem('diagnosticBookings', JSON.stringify(bookings));

      navigate('/diagnostics/success');
    } catch (error) {
      setErrors({ submit: 'Booking failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const total = appointmentData.price || 0;

  return (
    <main className="center" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Payment Methods */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>Payment Method</h2>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              background: paymentMethod === 'online' ? 'rgba(16,185,129,0.06)' : 'white',
              border: paymentMethod === 'online' ? '2px solid var(--accent-green)' : '1px solid #d1d5db',
              borderRadius: '10px',
              padding: '15px',
              cursor: 'pointer',
              marginBottom: '15px',
              transition: 'all 0.3s ease'
            }}
            onClick={() => { setPaymentMethod('online'); setErrors({}); }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Online Payment</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Credit/Debit Card or UPI</p>
                </div>
              </label>
            </div>

            <div style={{
              background: paymentMethod === 'upi' ? 'rgba(16,185,129,0.06)' : 'white',
              border: paymentMethod === 'upi' ? '2px solid var(--accent-green)' : '1px solid #d1d5db',
              borderRadius: '10px',
              padding: '15px',
              cursor: 'pointer',
              marginBottom: '15px',
              transition: 'all 0.3s ease'
            }}
            onClick={() => { setPaymentMethod('upi'); setErrors({}); }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>UPI Payment</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Google Pay, PhonePe, Paytm, etc.</p>
                </div>
              </label>
            </div>

            <div style={{
              background: paymentMethod === 'cash' ? 'rgba(16,185,129,0.06)' : 'white',
              border: paymentMethod === 'cash' ? '2px solid var(--accent-green)' : '1px solid #d1d5db',
              borderRadius: '10px',
              padding: '15px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => { setPaymentMethod('cash'); setErrors({}); }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', margin: 0 }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => {}}
                />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Pay at Center</div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Pay cash upon arrival</p>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Forms */}
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {paymentMethod === 'online' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>Card Details</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                    Cardholder Name
                  </label>
                  <input
                    id="cardholderName"
                    type="text"
                    value={cardData.cardholderName}
                    onChange={handleCardChange}
                    placeholder="John Doe"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.cardholderName ? '2px solid #dc2626' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.cardholderName && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.cardholderName}</small>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                    Card Number
                  </label>
                  <input
                    id="cardNumber"
                    type="text"
                    value={cardData.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, '');
                      if (/^\d*$/.test(value) && value.length <= 16) {
                        const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
                        setCardData(prev => ({ ...prev, cardNumber: formatted }));
                        if (errors.cardNumber) {
                          setErrors(prev => ({ ...prev, cardNumber: '' }));
                        }
                      }
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.cardNumber ? '2px solid #dc2626' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.cardNumber && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.cardNumber}</small>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                      Expiry Month
                    </label>
                    <select
                      id="expiryMonth"
                      value={cardData.expiryMonth}
                      onChange={handleCardChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: errors.expiryMonth ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">MM</option>
                      {Array.from({ length: 12 }, (_, i) => (
                        <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </option>
                      ))}
                    </select>
                    {errors.expiryMonth && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.expiryMonth}</small>}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                      Expiry Year
                    </label>
                    <select
                      id="expiryYear"
                      value={cardData.expiryYear}
                      onChange={handleCardChange}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: errors.expiryYear ? '2px solid #dc2626' : '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '13px',
                        boxSizing: 'border-box'
                      }}
                    >
                      <option value="">YY</option>
                      {Array.from({ length: 10 }, (_, i) => {
                        const year = new Date().getFullYear() + i;
                        return (
                          <option key={year} value={String(year).slice(-2)}>
                            {String(year).slice(-2)}
                          </option>
                        );
                      })}
                    </select>
                    {errors.expiryYear && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.expiryYear}</small>}
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 3) {
                        setCardData(prev => ({ ...prev, cvv: value }));
                        if (errors.cvv) {
                          setErrors(prev => ({ ...prev, cvv: '' }));
                        }
                      }
                    }}
                    placeholder="123"
                    maxLength="3"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.cvv ? '2px solid #dc2626' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.cvv && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.cvv}</small>}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                    />
                    <span style={{ fontSize: '13px' }}>Save card for future payments</span>
                  </label>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>UPI Details</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={handleUpiChange}
                    placeholder="yourname@bank"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: errors.upiId ? '2px solid #dc2626' : '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '13px',
                      boxSizing: 'border-box'
                    }}
                  />
                  {errors.upiId && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.upiId}</small>}
                </div>

                <div style={{
                  background: '#fef3c7',
                  border: '1px solid #fcd34d',
                  borderRadius: '6px',
                  padding: '12px',
                  fontSize: '12px',
                  color: '#92400e'
                }}>
                  Common UPI IDs: yourname@okhdfcbank, yourname@okaxis, yourname@okicici, yourname@paytm
                </div>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div>
                <div style={{
                  background: '#f0fdf4',
                  border: '2px solid #86efac',
                  borderRadius: '8px',
                  padding: '20px',
                  textAlign: 'center'
                }}>
                  <p style={{ fontSize: '14px', margin: 0, color: '#166534' }}>
                    💳 Pay with cash at the center
                  </p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '8px 0 0 0' }}>
                    Please bring exact cash or card. You can pay when you visit the center.
                  </p>
                </div>
              </div>
            )}

            {errors.submit && (
              <div style={{
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '6px',
                padding: '12px',
                fontSize: '12px',
                color: '#991b1b',
                marginTop: '15px'
              }}>
                {errors.submit}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => navigate('/diagnostics/patient-details')}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: 'white',
                  color: 'var(--accent-green)',
                  border: '2px solid var(--accent-green)',
                  borderRadius: '6px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  opacity: isProcessing ? 0.6 : 1
                }}
              >
                Back
              </button>
              <button
                onClick={() => {
                  if (paymentMethod === 'online') handleCardPayment();
                  else if (paymentMethod === 'upi') handleUpiPayment();
                  else handleCashPayment();
                }}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: isProcessing ? '#9ca3af' : 'var(--accent-green)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                {isProcessing ? 'Processing...' : paymentMethod === 'cash' ? 'Confirm Booking' : 'Pay Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>Booking Summary</h2>
          
          <div style={{
            background: 'white',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: '20px'
          }}>
            {/* Doctor Info */}
            {appointmentData.doctor && (
              <>
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Appointment</h3>
                  {appointmentData.image && (
                    <img src={appointmentData.image} alt={appointmentData.doctor} style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      marginBottom: '12px'
                    }} />
                  )}
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Doctor:</strong> {appointmentData.doctor}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Date:</strong> {appointmentData.date}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Time:</strong> {appointmentData.time}
                  </p>
                </div>
              </>
            )}

            {/* Patient Info */}
            {patientDetails.fullName && (
              <>
                <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Patient</h3>
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Name:</strong> {patientDetails.fullName}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Email:</strong> {patientDetails.email}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '13px' }}>
                    <strong style={{ color: '#374151' }}>Phone:</strong> {patientDetails.phone}
                  </p>
                </div>
              </>
            )}

            {/* Price Breakdown */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', margin: '0 0 12px 0' }}>Price</h3>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px'
              }}>
                <span>Appointment Fee</span>
                <span>₹{total}</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                fontSize: '13px',
                color: '#10b981'
              }}>
                <span>Discount</span>
                <span>₹0</span>
              </div>
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderTop: '2px solid #e5e7eb',
              fontSize: '18px',
              fontWeight: 'bold'
            }}>
              <span>Total Amount</span>
              <span style={{ color: 'var(--accent-green)' }}>₹{total}</span>
            </div>

            <div style={{
              background: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '6px',
              padding: '12px',
              marginTop: '15px',
              fontSize: '12px',
              color: '#166534'
            }}>
              ✓ Secure payment gateway
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
