import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

/**
 * Route protection wrapper component.
 * @param {Object} props
 * @param {Array<string>} props.allowedRoles - List of user roles permitted to access this route resource
 */
export default function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated, loading } = useAuth();

  // 🔄 If the context is still parsing local storage keys, hold rendering
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif", color: '#004124', backgroundColor: '#f8faf9' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <strong>Authenticating Portal Session...</strong>
        </div>
      </div>
    );
  }

  // 🛑 Case 1: User is anonymous -> Force drop back to sign-in checkpoint
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 🛑 Case 2: User lacks administrative authorization clearance scope -> Redirect to unauthorized page
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  //  Case 3: All permissions clean -> Safely mount child component route view layout templates
  return <Outlet />;
}