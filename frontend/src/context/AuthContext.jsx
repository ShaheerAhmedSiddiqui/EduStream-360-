import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      // 🎯 THE SAFE GUARD: Only parse if the string actually exists and isn't "undefined"
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to safely parse local user token metadata:", error);
      localStorage.clear(); // Clear corrupt artifacts if present
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', userData.token);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {/* 🎯 Prevent rendering child routes while verifying local storage state */}
      {!loading ? children : <div style={{ padding: '40px', fontFamily: 'sans-serif', color: '#004124' }}>Initializing Secure Portal Terminal...</div>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider component wrapper');
  }
  return context;
};