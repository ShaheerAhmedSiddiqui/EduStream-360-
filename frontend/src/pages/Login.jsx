import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import API from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await API.post('/api/auth/login', { email, password });
      const userData = response.data.user; 

      if (!userData || !userData.token) {
        throw new Error("Invalid response format from server.");
      }
      login(userData); 

      if (userData.role === 'student') {
        navigate('/student/dashboard');
      } else if (userData.role === 'instructor') {
        navigate('/instructor/dashboard');
      } else if (userData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.response?.data?.message || error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.headerContainer}>
          <h2 style={styles.title}>Portal Login</h2>
          <p style={styles.subtitle}>Sign in to access your secure dashboard workspace</p>
        </div>

        {errorMessage && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span style={styles.errorText}>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input 
              type="email" 
              placeholder="name@university.edu" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={styles.input} 
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={styles.input} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
          >
            {loading ? 'Verifying Credentials...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// 🔏 Modern Styling Theme Group
const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    backgroundImage: 'radial-gradient(at 0% 0%, #e2e8f0 0, transparent 50%), radial-gradient(at 50% 0%, #f1f5f9 0, transparent 50%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.03)',
    padding: '40px 32px',
    boxSizing: 'border-box',
  },
  headerContainer: {
    textAlign: 'center',
    marginBottom: '28px',
  },
  title: {
    color: '#0f172a',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    margin: 0,
    lineHeight: '1.5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    color: '#334155',
    fontSize: '13px',
    fontWeight: '600',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxSizing: 'border-box',
    width: '100%',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#fef2f2',
    border: '1px solid #fca5a5',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  errorIcon: {
    fontSize: '16px',
  },
  errorText: {
    color: '#991b1b',
    fontSize: '14px',
    fontWeight: '500',
  },
  button: {
    marginTop: '8px',
    padding: '14px',
    backgroundColor: '#004124', // Your custom dark green brand color
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, transform 0.1s ease',
    boxShadow: '0 4px 6px -1px rgba(0, 65, 36, 0.15)',
  },
  buttonDisabled: {
    backgroundColor: '#6b7280',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
};