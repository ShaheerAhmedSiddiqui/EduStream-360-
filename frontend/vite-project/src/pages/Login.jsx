import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static state confirmation for your reference
    alert(`Static Login Submission:\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '420px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 65, 36, 0.08)', overflow: 'hidden', border: '1px solid #e1e8e4' }}>
        
        {/* Flag Green Identity Header */}
        <div style={{ backgroundColor: '#004124', padding: '35px 20px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '32px', marginBottom: '5px' }}>🇵🇰</div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>Welcome Back</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#a3cfbb', fontWeight: '300' }}>EduStream Portal Sign In</p>
        </div>

        {/* Input Fields */}
        <form onSubmit={handleLoginSubmit} style={{ padding: '30px' }}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="shaheer@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>

          <button 
            type="submit" 
            style={{ width: '100%', backgroundColor: '#004124', color: '#ffffff', padding: '13px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 65, 36, 0.15)' }}
          >
            Access System Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}