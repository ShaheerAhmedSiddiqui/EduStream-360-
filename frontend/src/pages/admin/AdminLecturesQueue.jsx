import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import { OndemandVideo as PlayCircleOutlineIcon, CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
const pendingLectures = [
  {
    id: 'l1',
    title: 'Deep Stack Authentication Frameworks',
    instructor: 'Prof. Alex Mercer',
    description: 'Handling tokens, route interceptor configs, and database constraints.',
    group: 'Alpha-SE',
    semester: 6,
    video: 'https://youtube.com',
  },
  {
    id: 'l2',
    title: 'Advanced Query Indices for Relational Pools',
    instructor: 'Dr. Sarah Jenkins',
    description: 'B-Tree parameters optimization workflows inside MySQL engines.',
    group: 'Beta-CS',
    semester: 4,
    video: 'https://youtube.com',
  },
];

export default function AdminLecturesQueue() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
          Pending Core Syllabus Approvals Queue
        </Typography>

        <Stack spacing={2}>
          {pendingLectures.map((lec) => (
            <Card key={lec.id} variant="outlined" sx={{ bgcolor: 'action.hover' }}>
              <CardContent>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={3}
                  justifyContent="space-between"
                  alignItems={{ xs: 'stretch', md: 'center' }}
                >
                  <Box sx={{ minWidth: 280, flexGrow: 1 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: 16 }}>{lec.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                      Uploaded By: <strong>{lec.instructor}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                      {lec.description}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Chip label={`Cohort: ${lec.group}`} size="small" variant="outlined" />
                      <Chip label={`Sequence Focus: Semester ${lec.semester}`} size="small" variant="outlined" />
                    </Stack>
                  </Box>

                  <Stack spacing={1} sx={{ minWidth: 200 }}>
                    <Button
                      href={lec.video}
                      target="_blank"
                      rel="noreferrer"
                      variant="outlined"
                      size="small"
                      startIcon={<PlayCircleOutlineIcon />}
                    >
                      Preview YouTube Stream
                    </Button>
                    <Divider flexItem sx={{ my: 0.5 }} />
                    <Stack direction="row" spacing={1}>
                      <Button
                        onClick={() => alert('Syllabus segment verified and injected into live tracks.')}
                        variant="contained"
                        color="success"
                        size="small"
                        startIcon={<CheckCircleIcon />}
                        sx={{ flexGrow: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        onClick={() => alert('Syllabus segment flagged and bounced back to faculty draft bins.')}
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<CancelIcon />}
                        sx={{ flexGrow: 1 }}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}