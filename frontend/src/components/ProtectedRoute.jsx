import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext"
export default function ProtectedRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();
    console.log("🛡️ ProtectedRoute Audit -> User:", user, " | Loading State:", loading, " | Required Role:", allowedRole);
  if (loading) {
    return (
      <div style={{ padding: '40px', background: '#fff', color: '#334155', fontFamily: 'sans-serif' }}>
        <h3>🔒 Security Gate: Verifying Session State...</h3>
        <p>If this text stays here permanently, your AuthContext is failing to switch loading to false.</p>
      </div>
    );
  }

  if (!user) {
    console.warn("🛡️ Access Denied: No session data payload found. Bouncing to /login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    console.warn(`🛡️ Access Denied: User role is "${user.role}" but this path strictly requires "${allowedRole}"`);
    return (
      <div style={{ padding: '40px', background: '#fff', color: '#991b1b', fontFamily: 'sans-serif' }}>
        <h3>🚫 Security Gate: Unauthorized Access Domain</h3>
        <p>Your current active profile account role does not match this workspace's parameters.</p>
        <button onClick={() => window.location.href = '/login'} style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>
          Return to Entry Portal
        </button>
      </div>
    );
  }

  return children;
}