import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentLectures from './StudentLectures';
import StudentQuizzes from './StudentQuizzes';
import StudentProfile from './StudentProfile';
import { Box, Typography, Button, Stack } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';

export default function StudentDashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('lectures');

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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 🧭 NAVIGATION SIDEBAR */}
      <Box 
        sx={{ 
          width: '280px', 
          backgroundColor: '#002917', 
          color: '#fff', 
          display: 'flex', 
          flexDirection: 'column', 
          padding: '24px', 
          boxSizing: 'border-box' 
        }}
      >
        <Box sx={{ paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '24px' }}>
          <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px', m: 0 }}>
            Student Portal
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '12px', color: '#a3cfbb', display: 'block', marginTop: '4px' }}>
            Learning Management
          </Typography>
        </Box>

        <Stack spacing={1} sx={{ flexGrow: 1 }}>
          <Button
            startIcon={<MenuBookIcon />}
            onClick={() => setCurrentView('lectures')}
            sx={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              borderRadius: '8px',
              color: currentView === 'lectures' ? '#fff' : '#cbd5e1',
              backgroundColor: currentView === 'lectures' ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: currentView === 'lectures' ? '600' : '500',
              fontSize: '15px',
              textTransform: 'none',
              width: '100%',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
            }}
          >
            My Lectures
          </Button>

          <Button
            startIcon={<QuizIcon />}
            onClick={() => setCurrentView('quizzes')}
            sx={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              borderRadius: '8px',
              color: currentView === 'quizzes' ? '#fff' : '#cbd5e1',
              backgroundColor: currentView === 'quizzes' ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: currentView === 'quizzes' ? '600' : '500',
              fontSize: '15px',
              textTransform: 'none',
              width: '100%',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
            }}
          >
            Quizzes & Assignments
          </Button>

          <Button
            startIcon={<AccountBoxIcon />}
            onClick={() => setCurrentView('profile')}
            sx={{
              justifyContent: 'flex-start',
              padding: '14px 16px',
              borderRadius: '8px',
              color: currentView === 'profile' ? '#fff' : '#cbd5e1',
              backgroundColor: currentView === 'profile' ? 'rgba(255,255,255,0.15)' : 'transparent',
              fontWeight: currentView === 'profile' ? '600' : '500',
              fontSize: '15px',
              textTransform: 'none',
              width: '100%',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)' }
            }}
          >
            My Profile Settings
          </Button>
        </Stack>

        <Button 
          variant="outlined" 
          startIcon={<LogoutIcon />}
          onClick={logout} 
          sx={{ 
            padding: '12px', 
            borderRadius: '8px', 
            borderColor: 'rgba(255,255,255,0.25)', 
            color: '#fff', 
            fontWeight: '600', 
            textTransform: 'none',
            width: '100%',
            '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.05)' }
          }}
        >
          Sign Out
        </Button>
      </Box>

      {/* 💻 MAIN CONTENT SCREEN VIEWPORT */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box 
          sx={{ 
            height: '70px', 
            backgroundColor: '#fff', 
            borderBottom: '1px solid #e2e8f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0 32px' 
          }}
        >
          <Typography variant="h6" sx={{ color: '#0f172a', fontSize: '18px', fontWeight: '600', m: 0 }}>
            {currentView === 'lectures' && 'Classroom Lectures'}
            {currentView === 'quizzes' && 'Evaluations & Tasks'}
            {currentView === 'profile' && 'Manage Identity Profile'}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Signed in as: <Box component="strong" sx={{ color: '#004124', fontWeight: '600' }}>{user?.name || 'Shaheer Ahmed'}</Box>
          </Typography>
        </Box>

        <Box sx={{ padding: '32px', overflowY: 'auto', flexGrow: 1, boxSizing: 'border-box' }}>
          {renderContentView()}
        </Box>
      </Box>
    </Box>
  );
}