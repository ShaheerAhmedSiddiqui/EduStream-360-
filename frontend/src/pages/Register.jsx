import React, { useState } from 'react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [studyGroup, setStudyGroup] = useState('');

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const payload = { fullName, email, password, role, studyGroup };
    alert(`Static Registration Submission:\n${JSON.stringify(payload, null, 2)}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '450px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 65, 36, 0.08)', overflow: 'hidden', border: '1px solid #e1e8e4' }}>
        
        <div style={{ backgroundColor: '#004124', padding: '35px 20px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '32px', marginBottom: '5px' }}>🇵🇰</div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>Create Account</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#a3cfbb', fontWeight: '300' }}>Join Your Academic Workspace</p>
        </div>

        <form onSubmit={handleRegisterSubmit} style={{ padding: '30px' }}>
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g., Shaheer Ahmed"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
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

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Select Portal Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '14px', boxSizing: 'border-box' }}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          {role === 'student' && (
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Study Group / Batch Section</label>
              <input 
                type="text" 
                placeholder="e.g., SE-2024-Alpha"
                value={studyGroup}
                onChange={(e) => setStudyGroup(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
                required 
              />
            </div>
          )}

          <button 
            type="submit" 
            style={{ width: '100%', backgroundColor: '#004124', color: '#ffffff', padding: '13px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 65, 36, 0.15)' }}
          >
            Register Account
          </button>
        </form>
      </div>
    </div>
  );
}