import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../App.css';

export default function PatientDetailsPage() {
  const navigate = useNavigate();
  const appointmentData = JSON.parse(localStorage.getItem('appointmentData') || '{}');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    day: '',
    month: '',
    year: '',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    healthConcerns: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value, name, type } = e.target;
    const fieldName = type === 'radio' ? name : id;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (10 digits required)';
    }
    if (!formData.day || !formData.month || !formData.year) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      setIsLoading(true);
      const dob = `${formData.day}-${months[parseInt(formData.month) - 1]}-${formData.year}`;
      const patientData = {
        ...formData,
        dob,
        fullName: `${formData.firstName} ${formData.lastName}`
      };
      localStorage.setItem('patientDetails', JSON.stringify(patientData));
      
      setTimeout(() => {
        navigate('/diagnostics/payment');
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <main className="center" style={{ padding: '40px 20px' }}>
      <div style={{ maxWidth: '800px', width: '100%' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Patient Details</h2>

        {/* Appointment Summary */}
        {appointmentData.doctor && (
          <div style={{
            background: '#f0fdf4',
            border: '2px solid #86efac',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px'
          }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#166534', fontSize: '16px', fontWeight: 'bold' }}>Appointment Details</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px'
            }}>
              <div>
                <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Doctor</p>
                <p style={{ margin: '4px 0 0 0', color: '#166534', fontWeight: 'bold' }}>{appointmentData.doctor}</p>
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Date</p>
                <p style={{ margin: '4px 0 0 0', color: '#166534', fontWeight: 'bold' }}>{appointmentData.date}</p>
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Time</p>
                <p style={{ margin: '4px 0 0 0', color: '#166534', fontWeight: 'bold' }}>{appointmentData.time}</p>
              </div>
              <div>
                <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>Fee</p>
                <p style={{ margin: '4px 0 0 0', color: '#10b981', fontWeight: 'bold' }}>₹{appointmentData.price}</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div style={{
          background: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          {/* Name Fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.firstName ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.firstName && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.firstName}</small>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.lastName ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.lastName && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.lastName}</small>}
            </div>
          </div>

          {/* Email and Phone */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.email ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.email && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.email}</small>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.phone ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.phone && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.phone}</small>}
            </div>
          </div>

          {/* Date of Birth */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
              Date of Birth
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '10px'
            }}>
              <select
                id="day"
                value={formData.day}
                onChange={handleChange}
                style={{
                  padding: '12px 16px',
                  border: errors.dateOfBirth ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Day</option>
                {days.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select
                id="month"
                value={formData.month}
                onChange={handleChange}
                style={{
                  padding: '12px 16px',
                  border: errors.dateOfBirth ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Month</option>
                {months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
              </select>
              <select
                id="year"
                value={formData.year}
                onChange={handleChange}
                style={{
                  padding: '12px 16px',
                  border: errors.dateOfBirth ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                <option value="">Year</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            {errors.dateOfBirth && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.dateOfBirth}</small>}
          </div>

          {/* Gender */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
              Gender
            </label>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['Male', 'Female', 'Other'].map(option => (
                <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={formData.gender === option}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Address Fields */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
              Address
            </label>
            <input
              id="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter street address"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: errors.address ? '2px solid #dc2626' : '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
            />
            {errors.address && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.address}</small>}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                City
              </label>
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.city ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.city && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.city}</small>}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                State
              </label>
              <input
                id="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: errors.state ? '2px solid #dc2626' : '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
              {errors.state && <small style={{ color: '#dc2626', display: 'block', marginTop: '4px' }}>{errors.state}</small>}
            </div>
          </div>

          {/* Health Concerns */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
              Health Concerns (Optional)
            </label>
            <textarea
              id="healthConcerns"
              value={formData.healthConcerns}
              onChange={handleChange}
              placeholder="Describe any health concerns or medical conditions..."
              rows="4"
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '15px',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => navigate('/diagnostics/booking')}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#2563eb',
                border: '2px solid #2563eb',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
              disabled={isLoading}
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                background: isLoading ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {isLoading ? 'Processing...' : 'Continue to Payment'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
