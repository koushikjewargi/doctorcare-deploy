import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Patient() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    address: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleContinue = () => {
    const newErrors = {
      name: formData.name.trim() ? '' : 'Name required',
      age: formData.age.trim() ? '' : 'Age required',
      address: formData.address.trim() ? '' : 'Address required'
    };

    setErrors(newErrors);

    if (newErrors.name === '' && newErrors.age === '' && newErrors.address === '') {
      localStorage.setItem('patientDetails', JSON.stringify(formData));
      navigate('/payment');
    }
  };

  return (
    <main className="center">
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
      <div className="form">
        <h2>Patient Details</h2>

        <div className="form-group">
          <label>Full Name</label>
          <input
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <small className="error">{errors.name}</small>
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            id="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
          <small className="error">{errors.age}</small>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
          <small className="error">{errors.address}</small>
        </div>

        <button 
          id="payBtn" 
          type="button" 
          className="btn-book"
          onClick={handleContinue}
        >
          Continue to Payment
        </button>
      </div>
    </main>
  );
}
