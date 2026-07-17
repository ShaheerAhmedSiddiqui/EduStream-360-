import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '460px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(220, 38, 38, 0.05)', padding: '40px 30px', textAlign: 'center', border: '1px solid #e1e8e4' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🛑</div>
        <h1 style={{ color: '#991b1b', fontSize: '22px', fontWeight: '700', margin: '0 0 10px 0' }}>Access Restriction Lockout</h1>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', margin: '0 0 30px 0' }}>
          Your user profile profile configuration does not possess valid clearance to entry this secure layout system zone.
        </p>
        <button 
          onClick={() => navigate('/login')}
          style={{ width: '100%', backgroundColor: '#004124', color: '#ffffff', padding: '12px', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
        >
          Return to Secure Gate
        </button>
      </div>
    </div>
  );
}