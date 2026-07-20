import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLectures from './StudentLectures';
import StudentQuizzes from './StudentQuizzes';
import StudentProfile from './StudentProfile';

export default function StudentDashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('lectures');

  // Static view router matrix
  const renderContentView = () => {
    switch (currentView) {
      case 'lectures':
        return <StudentLectures />;
      case 'quizzes':
        return <StudentQuizzes />;
      case 'profile':
        return <StudentProfile />;
      default:
        return <StudentLectures />;
    }
  };

  return (
    <div style={styles.container}>
      {/* 🧭 NAVIGATION SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.sidebarTitle}>Student Portal</h2>
          <span style={styles.sidebarSubtitle}>Learning Management</span>
        </div>

        <nav style={styles.navGroup}>
          <button 
            onClick={() => setCurrentView('lectures')} 
            style={currentView === 'lectures' ? { ...styles.navButton, ...styles.navActive } : styles.navButton}
          >
            📚 My Lectures
          </button>
          <button 
            onClick={() => setCurrentView('quizzes')} 
            style={currentView === 'quizzes' ? { ...styles.navButton, ...styles.navActive } : styles.navButton}
          >
            📝 Quizzes & Assignments
          </button>
          <button 
            onClick={() => setCurrentView('profile')} 
            style={currentView === 'profile' ? { ...styles.navButton, ...styles.navActive } : styles.navButton}
          >
            👤 My Profile Settings
          </button>
        </nav>

        <button onClick={logout} style={styles.logoutButton}>
          Sign Out
        </button>
      </div>

      {/* 💻 MAIN CONTENT SCREEN VIEWPORT */}
      <div style={styles.mainViewport}>
        <div style={styles.topHeader}>
          <h3 style={styles.pageTitle}>
            {currentView === 'lectures' && 'Classroom Lectures'}
            {currentView === 'quizzes' && 'Evaluations & Tasks'}
            {currentView === 'profile' && 'Manage Identity Profile'}
          </h3>
          <div style={styles.userInfo}>
            Signed in as: <strong style={styles.userName}>{user?.name || 'Shaheer Ahmed'}</strong>
          </div>
        </div>

        <div style={styles.contentWrapper}>
          {renderContentView()}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' },
  sidebar: { width: '280px', backgroundColor: '#002917', color: '#fff', display: 'flex', flexDirection: 'column', padding: '24px', boxSizing: 'border-box' },
  sidebarHeader: { paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' },
  sidebarTitle: { fontSize: '20px', margin: 0, fontWeight: '700', letterSpacing: '-0.5px' },
  sidebarSubtitle: { fontSize: '12px', color: '#a3cfbb', display: 'block', marginTop: '4px' },
  navGroup: { display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 },
  navButton: { textAlign: 'left', padding: '14px 16px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: '#cbd5e1', cursor: 'pointer', fontWeight: '500', fontSize: '15px', width: '100%', transition: 'all 0.2s' },
  navActive: { backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontWeight: '600' },
  logoutButton: { padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.25)', backgroundColor: 'transparent', color: '#fff', cursor: 'pointer', fontWeight: '600', width: '100%', transition: 'background 0.2s' },
  mainViewport: { flexGrow: 1, display: 'flex', flexDirection: 'column' },
  topHeader: { height: '70px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' },
  pageTitle: { margin: 0, color: '#0f172a', fontSize: '18px', fontWeight: '600' },
  userInfo: { fontSize: '14px', color: '#64748b' },
  userName: { color: '#004124' },
  contentWrapper: { padding: '32px', overflowY: 'auto', flexGrow: 1, boxSizing: 'border-box' }
};