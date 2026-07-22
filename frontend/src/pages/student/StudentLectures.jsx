import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  PlayCircleOutlineOutlined as PlayCircleOutlineIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { studentService } from '../../services/api';

export default function StudentLectures() {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLectures() {
      try {
        setLoading(true);
        const response = await studentService.getMyLectures();

        const lectureData = response.lectures || response || [];
        setLectures(lectureData);
        if (lectureData.length > 0) {
          setSelectedLecture(lectureData[0]);
        }

      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load classroom lectures.');
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Card variant="outlined" sx={{ borderRadius: '12px' }}>
      <CardContent sx={{ p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <SchoolIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Your Academic Lectures
          </Typography>
        </Stack>
        {lectures.length === 0 ? (
          <Typography color="text.secondary">No lectures published yet.</Typography>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: 3
            }}
          >
            <Box
              sx={{
                width: "30%",
                borderRight: "1px solid #ddd",
                p: 2
              }}
            >
              {lectures.map((lecture) => (
                <Card
                  key={lecture.id}
                  sx={{
                    mb: 2,
                    cursor: "pointer",
                    bgcolor:
                      selectedLecture?.id === lecture.id
                        ? "#e8f5e9"
                        : "#fff"
                  }}
                  onClick={() => setSelectedLecture(lecture)}
                >
                  <CardContent>
                    <Typography fontWeight={600}>
                      {lecture.title}
                    </Typography>
                    <Typography variant="caption">
                      {lecture.name}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
            <Box
              sx={{
                flex: 1,
                p: 3
              }}
            >
              {selectedLecture && (
                <>
                  <Typography variant="h5">
                    {selectedLecture.title}
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    {selectedLecture.description}
                  </Typography>
                  <iframe
                    width="100%"
                    height="500"
                    src={selectedLecture.youtubeUrl}
                    title={selectedLecture.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      border: "none",
                      borderRadius: "12px"
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}