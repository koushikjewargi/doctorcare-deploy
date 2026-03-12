import { useNavigate } from 'react-router-dom';
import '../../../App.css';

export default function FailurePage() {
  const navigate = useNavigate();

  return (
    <main className="center" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
        {/* Error Icon */}
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: '#fee2e2',
          border: '4px solid #dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 30px',
          fontSize: '50px'
        }}>
          ✕
        </div>

        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#991b1b',
          margin: '0 0 12px 0'
        }}>
          Payment Failed
        </h1>

        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: '0 0 30px 0'
        }}>
          Unfortunately, your payment couldn't be processed. Please try again or use a different payment method.
        </p>

        {/* Error Details */}
        <div style={{
          background: '#fee2e2',
          border: '2px solid #fecaca',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#991b1b',
            margin: '0 0 12px 0'
          }}>
            What went wrong?
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#991b1b',
            fontSize: '13px'
          }}>
            <li style={{ marginBottom: '8px' }}>
              Invalid card or UPI details
            </li>
            <li style={{ marginBottom: '8px' }}>
              Insufficient balance in account
            </li>
            <li style={{ marginBottom: '8px' }}>
              Network or connectivity issue
            </li>
            <li>
              Payment gateway error
            </li>
          </ul>
        </div>

        {/* Info Box */}
        <div style={{
          background: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#374151',
            margin: '0 0 12px 0'
          }}>
            How to resolve this?
          </h3>
          <ul style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#6b7280',
            fontSize: '13px'
          }}>
            <li style={{ marginBottom: '8px' }}>
              Verify your card/UPI details are correct
            </li>
            <li style={{ marginBottom: '8px' }}>
              Check if your account has sufficient balance
            </li>
            <li style={{ marginBottom: '8px' }}>
              Try a different payment method
            </li>
            <li style={{ marginBottom: '8px' }}>
              Check your internet connection
            </li>
            <li>
              Contact your bank if the issue persists
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexDirection: 'column'
        }}>
          <button
            onClick={() => navigate('/diagnostics/payment')}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'var(--accent-green)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Retry Payment
          </button>
          <button
            onClick={() => navigate('/diagnostics')}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: 'white',
              color: 'var(--accent-green)',
              border: '2px solid var(--accent-green)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px'
            }}
          >
            Back to Home
          </button>
        </div>

        {/* Support */}
        <div style={{
          marginTop: '30px',
          paddingTop: '30px',
          borderTop: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '0 0 8px 0' }}>
            Still facing issues?
          </p>
          <a href="mailto:support@doctorcareonline.com" style={{
            color: 'var(--accent-green)',
            fontSize: '13px',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}>
            Contact our support team
          </a>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: '8px 0 0 0' }}>
            Email: support@doctorcareonline.com<br/>
            Phone: +91-1800-200-3000
          </p>
        </div>
      </div>
    </main>
  );
}
