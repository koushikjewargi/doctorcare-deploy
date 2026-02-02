import React from 'react';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
      {}
      <header style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#f0fdfa' }}>
        <h1 style={{ color: '#00d09c', fontSize: '2.5rem' }}>Doctor Plus+</h1>
        <h2 style={{ fontSize: '1.8rem' }}>Find Trusted Doctors</h2>
        <p style={{ maxWidth: '600px', margin: '10px auto', color: '#666' }}>
          Book appointments with the best doctors in your area. Secure, fast, and easy to use.
        </p>
        
        {}
        <div style={{ marginTop: '30px' }}>
          <input 
            type="text" 
            placeholder="Search doctors, specialties..." 
            style={{ 
              padding: '12px 20px', 
              width: '350px', 
              borderRadius: '25px', 
              border: '1px solid #ddd',
              outline: 'none'
            }} 
          />
          <button style={{ 
            padding: '12px 30px', 
            marginLeft: '-50px', 
            borderRadius: '25px', 
            backgroundColor: '#00d09c', 
            color: 'white', 
            border: 'none', 
            cursor: 'pointer' 
          }}>
            Search
          </button>
        </div>
      </header>

      {}
      <section style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h3>Popular Specialties</h3>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {['Cardiology', 'Dental', 'Neurology', 'General'].map((spec) => (
            <div key={spec} style={{ padding: '20px', border: '1px solid #eee', borderRadius: '10px', width: '120px' }}>
              {spec}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;