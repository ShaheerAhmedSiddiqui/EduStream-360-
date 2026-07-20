import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔄 DYNAMIC LINE: For routing users after sign-up
import { authService } from '../services/api'; // 🔄 DYNAMIC LINE: Import backend client methods

export default function Register() {
  const navigate = useNavigate(); // 🔄 DYNAMIC LINE: Instantiate navigation hook

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studyGroup, setStudyGroup] = useState('');
  
  const [loading, setLoading] = useState(false); // 🔄 DYNAMIC LINE: Track ongoing network requests
  const [errorMessage, setErrorMessage] = useState(''); // 🔄 DYNAMIC LINE: Capture backend errors

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // 🔄 DYNAMIC LINE: Lock UI actions
    setErrorMessage(''); // 🔄 DYNAMIC LINE: Flush past errors

    try {
      // 🔄 DYNAMIC LINE: Force 'student' role in the submission contract payload
      await authService.register({ 
        username: fullName, 
        email, 
        password, 
        role: 'student', 
      });

      alert('Student account registration successful! Directing to login portal...');
      navigate('/login'); // 🔄 DYNAMIC LINE: Programmatically route user on success
    } catch (error) {
      console.error('Registration failed:', error);
      // 🔄 DYNAMIC LINE: Extract custom Express/MySQL constraint messages dynamically
      const friendlyMessage = error.response?.data?.message || 'Failed to communicate with auth system node.';
      setErrorMessage(friendlyMessage); // 🔄 DYNAMIC LINE: Render feedback to user
    } finally {
      setLoading(false); // 🔄 DYNAMIC LINE: Unlock form inputs
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f7f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', width: '100%', maxWidth: '450px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0, 65, 36, 0.08)', overflow: 'hidden', border: '1px solid #e1e8e4' }}>
        
        <div style={{ backgroundColor: '#004124', padding: '35px 20px', textAlign: 'center', color: '#ffffff' }}>
          <div style={{ fontSize: '32px', marginBottom: '5px' }}>🇵🇰</div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px' }}>Student Registration</h1>
          <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#a3cfbb', fontWeight: '300' }}>Create your official Portal Workspace</p>
        </div>

        <form onSubmit={handleRegisterSubmit} style={{ padding: '30px' }}>
          
          {errorMessage && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', padding: '12px 14px', borderRadius: '8px', color: '#991b1b', fontSize: '13px', fontWeight: '500', marginBottom: '20px' }}>
              ⚠️ {errorMessage}
            </div>
          )}

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Full Name</label>
            <input 
              type="text" 
              placeholder="e.g., Shaheer Ahmed"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading} // 🔄 DYNAMIC LINE
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>University Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading} // 🔄 DYNAMIC LINE
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
              disabled={loading} // 🔄 DYNAMIC LINE
              style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              required 
            />
          </div>


          <button 
            type="submit" 
            disabled={loading} // 🔄 DYNAMIC LINE
            style={{ width: '100%', backgroundColor: loading ? '#64748b' : '#004124', color: '#ffffff', padding: '13px', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(0, 65, 36, 0.15)' }}
          >
            {loading ? 'Submitting Details...' : 'Register Student Workspace'}
          </button>
        </form>
      </div>
    </div>
  );
}