import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import SchoolIcon from '@mui/icons-material/School';

export default function StudentLectures() {
  const staticLectures = [
    { id: 1, title: 'Introduction to Full-Stack Architectures', description: 'Understanding clients, servers, and spatial file hosting networks.', instructor: 'Dr. Sarah Jenkins', link: 'https://youtube.com' },
    { id: 2, title: 'Database Normalization Fundamentals', description: 'Deep dive into relational schemas, table joins, and performance patterns.', instructor: 'Prof. Alex Mercer', link: 'https://youtube.com' }
  ];

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <SchoolIcon sx={{ color: '#004124' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#004124' }}>
            Your Academic Lectures Pipeline
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {staticLectures.map((lec) => (
            <Box
              key={lec.id}
              sx={{
                p: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                backgroundColor: '#fafafa',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 600, color: '#0f172a', mb: 0.5 }}>
                  {lec.title}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1, fontWeight: 500 }}>
                  Conducted by: {lec.instructor}
                </Typography>
                <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.5 }}>
                  {lec.description}
                </Typography>
              </Box>
              
              <Button
                component="a"
                href={lec.link}
                target="_blank"
                rel="noreferrer"
                variant="contained"
                startIcon={<PlayCircleOutlineIcon />}
                sx={{
                  backgroundColor: '#e0f2fe',
                  color: '#0369a1',
                  boxShadow: 'none',
                  textTransform: 'none',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  '&:hover': { backgroundColor: '#bae6fd', boxShadow: 'none' }
                }}
              >
                Stream Video Material
              </Button>
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}