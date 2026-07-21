import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Button, Stack } from '@mui/material';
import { Assignment as AssignmentIcon, RocketLaunch as RocketLaunchIcon } from '@mui/icons-material';

export default function StudentQuizzes() {
  const staticQuizzes = [
    { id: 101, title: 'MERN Deployment Quiz 1', lectureName: 'Full-Stack Architectures', questionsCount: 10, status: 'Pending' },
    { id: 102, title: 'SQL Constraints Assessment', lectureName: 'Database Normalization', questionsCount: 5, status: 'Completed', score: '85%' }
  ];

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <AssignmentIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Assigned Evaluation Targets
          </Typography>
        </Stack>

        <Grid container spacing={2.5}>
          {staticQuizzes.map((quiz) => (
            <Grid item xs={12} sm={6} key={quiz.id}>
              <Card
                variant="outlined"
                sx={{
                  p: 2.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                  <Chip
                    label={quiz.status}
                    size="small"
                    color={quiz.status === 'Completed' ? 'success' : 'warning'}
                    sx={{ fontWeight: 600, fontSize: '11px' }}
                  />
                  {quiz.score && (
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'success.main' }}>
                      Score: {quiz.score}
                    </Typography>
                  )}
                </Stack>

                <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '15px' }}>
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
                    color="success"
                    startIcon={<RocketLaunchIcon />}
                    onClick={() => alert('Launching evaluation engine sequence...')}
                    sx={{
                      mt: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Start Test
                  </Button>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}