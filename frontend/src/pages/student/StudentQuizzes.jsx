import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Button, Stack } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function StudentQuizzes() {
  const staticQuizzes = [
    { id: 101, title: 'MERN Deployment Quiz 1', lectureName: 'Full-Stack Architectures', questionsCount: 10, status: 'Pending' },
    { id: 102, title: 'SQL Constraints Assessment', lectureName: 'Database Normalization', questionsCount: 5, status: 'Completed', score: '85%' }
  ];

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <AssignmentIcon sx={{ color: '#004124' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#004124' }}>
            Assigned Evaluation Targets
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {staticQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} key={quiz.id}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  p: 2.5,
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <Chip
                    label={quiz.status}
                    size="small"
                    sx={{
                      fontWeight: 600,
                      fontSize: '11px',
                      backgroundColor: quiz.status === 'Completed' ? '#dcfce7' : '#fef9c3',
                      color: quiz.status === 'Completed' ? '#166534' : '#854d0e',
                    }}
                  />
                  {quiz.score && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#166534' }}>
                      Score: {quiz.score}
                    </Typography>
                  )}
                </Stack>

                <Typography sx={{ fontWeight: 600, color: '#0f172a', fontSize: '15px' }}>
                  {quiz.title}
                </Typography>
                
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Linked Context: {quiz.lectureName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Scope: {quiz.questionsCount} Multiple Choice Questions
                </Typography>

                {quiz.status === 'Pending' && (
                  <Button
                    variant="contained"
                    startIcon={<RocketLaunchIcon />}
                    onClick={() => alert('Launching evaluation engine sequence...')}
                    sx={{
                      mt: 1.5,
                      backgroundColor: '#004124',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: '#002917' }
                    }}
                  >
                    Start Test
                  </Button>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}