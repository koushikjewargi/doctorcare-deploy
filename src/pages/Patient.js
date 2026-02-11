import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

export default function Patient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    day: '',
    month: '',
    year: '',
    gender: 'Male',
    mobileNumber: '',
    email: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value, type, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [type === 'radio' ? name : id]: value
    }));
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.day || !formData.month || !formData.year) newErrors.age = 'Complete date of birth is required';
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      const dob = `${formData.day}-${formData.month}-${formData.year}`;
      const patientData = {
        ...formData,
        dob
      };
      localStorage.setItem('patientDetails', JSON.stringify(patientData));
      navigate('/payment');
    }
  };

  return (
    <main className="center">
      <div className="patient-form">
        <h2>Patient Details</h2>

        <div className="form-group">
          <label>Patient's Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <div className="date-selectors">
            <select
              id="day"
              value={formData.day}
              onChange={handleChange}
              className="date-select"
            >
              <option value="">Day</option>
              {days.map(day => <option key={day} value={day}>{day}</option>)}
            </select>
            <select
              id="month"
              value={formData.month}
              onChange={handleChange}
              className="date-select"
            >
              <option value="">Month</option>
              {months.map((month, idx) => <option key={idx} value={month}>{month}</option>)}
            </select>
            <select
              id="year"
              value={formData.year}
              onChange={handleChange}
              className="date-select"
            >
              <option value="">Year</option>
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          {errors.age && <small className="error">{errors.age}</small>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <div className="gender-options">
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              <span>Male</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              <span>Female</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === 'Others'}
                onChange={handleChange}
              />
              <span>Others</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Mobile Number</label>
          <input
            id="mobileNumber"
            type="tel"
            placeholder="+8801000000000"
            value={formData.mobileNumber}
            onChange={handleChange}
            className={errors.mobileNumber ? 'input-error' : ''}
          />
          {errors.mobileNumber && <small className="error">{errors.mobileNumber}</small>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            id="email"
            type="email"
            placeholder="your.email@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <button 
          className="btn-continue"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </main>
  );
}
