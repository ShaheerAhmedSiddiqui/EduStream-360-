import React from 'react';
import { Card, CardContent, Typography, Stack, Box, Chip, Button, Divider } from '@mui/material';
import { Groups as GroupsIcon, CalendarMonth as CalendarMonthIcon, FactCheck as FactCheckIcon, OndemandVideo as OndemandVideoIcon } from '@mui/icons-material';

export default function PublishedLectures() {
  const staticLectures = [
    {
      id: '65cb123f...',
      title: 'Advanced React Optimization Patterns',
      description: 'Analyzing fiber reconstruction cycles, profiling component trees, and avoiding unneeded state calculations.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      studyGroup: 'Alpha-SE',
      classofStudy: 6,
      isApproved: true,
      reviewedBy: 'Admin (Dean Office)',
    },
    {
      id: '65cb456e...',
      title: 'Relational Schema Constraints & Foreign Keys',
      description: 'Enforcing data boundaries at the transactional layer inside MySQL instances.',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      studyGroup: 'Beta-CS',
      classofStudy: 4,
      isApproved: false,
      reviewedBy: null,
    },
  ];

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 2.5 }}>
          Your Academic Publications Timeline
        </Typography>

        <Stack spacing={2}>
          {staticLectures.map((lec) => (
            <Card key={lec.id} variant="outlined" sx={{ bgcolor: 'action.hover' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                  <Typography sx={{ fontWeight: 600, fontSize: 17, color: 'text.primary' }}>
                    {lec.title}
                  </Typography>
                  <Chip
                    icon={<FactCheckIcon />}
                    label={lec.isApproved ? 'Verified & Live' : 'Awaiting Review Check'}
                    size="small"
                    color={lec.isApproved ? 'success' : 'warning'}
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {lec.description}
                </Typography>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Stack direction="row" spacing={3} flexWrap="wrap" rowGap={1}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <GroupsIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Group: <strong>{lec.studyGroup}</strong>
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarMonthIcon fontSize="small" color="action" />
                    <Typography variant="caption" color="text.secondary">
                      Semester Class: <strong>{lec.classofStudy}</strong>
                    </Typography>
                  </Stack>
                  {lec.reviewedBy && (
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <FactCheckIcon fontSize="small" color="action" />
                      <Typography variant="caption" color="text.secondary">
                        Audit By: <strong>{lec.reviewedBy}</strong>
                      </Typography>
                    </Stack>
                  )}
                </Stack>

                <Button
                  component="a"
                  href={lec.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<OndemandVideoIcon />}
                  sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600, boxShadow: 'none' }}
                >
                  View YouTube Resource Link
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}