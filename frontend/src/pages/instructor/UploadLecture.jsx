import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';

import { RocketLaunch as RocketLaunchIcon, MenuBook as MenuBookIcon } from '@mui/icons-material';

const emptyForm = { title: '', description: '', videoUrl: '', studyGroup: '', classofStudy: 1 };

export default function UploadLecture() {
  const [toast, setToast] = useState(false);
  const [formData, setFormData] = useState({
    studyGroup: "",
    classofStudy: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Lecture object ready for payload submission to API:', formData);
    setToast(true);
    setFormData(emptyForm);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 800, borderRadius: '12px' }}>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
          <MenuBookIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            Publish a Curriculum Syllabus Matrix
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleFormSubmit}>
          <Stack spacing={2.5}>
            <TextField
              label="Lecture Title"
              name="title"
              placeholder="e.g., Implementing Relational Database Schemas"
              value={formData.title}
              onChange={handleInputChange}
              required
              fullWidth
            />

            <TextField
              label="Lecture Description / Scope Summary"
              name="description"
              placeholder="Outline the core learning targets and constraints covered throughout this video reference code structure..."
              value={formData.description}
              onChange={handleInputChange}
              required
              fullWidth
              multiline
              rows={4}
            />

            <TextField
              label="YouTube Stream Reference URL Link"
              name="videoUrl"
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={formData.videoUrl}
              onChange={handleInputChange}
              required
              fullWidth
              helperText="Upload your video stream material to your YouTube channel first, then paste the shared link path above."
            />

            {/* Responsive Row using Stack */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ width: "100%" }}
            >
              {/* Study Group */}
              <TextField
                select
                label="Study Group"
                name="studyGroup"
                required
                fullWidth
                value={formData.studyGroup}
                onChange={handleInputChange}
              >
                <MenuItem value="Pre Medical">Pre Medical</MenuItem>
                <MenuItem value="Pre Engineering">Pre Engineering</MenuItem>
                <MenuItem value="Computer Science">Computer Science</MenuItem>
              </TextField>

              {/* Class / Semester */}
              <TextField
                select
                label="Class / Semester"
                name="classOfStudy"
                required
                fullWidth
                value={formData.classOfStudy}
                onChange={handleInputChange}
              >
                {/* Classes */}
                {[...Array(12)].map((_, index) => (
                  <MenuItem key={`class-${index + 1}`} value={`Class ${index + 1}`}>
                    Class {index + 1}
                  </MenuItem>
                ))}

                {/* Semesters */}
                {[...Array(8)].map((_, index) => (
                  <MenuItem key={`semester-${index + 1}`} value={`Semester ${index + 1}`}>
                    Semester {index + 1}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<RocketLaunchIcon />}
              sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600, px: 3 }}
            >
              Broadcast Material to Admin Queues
            </Button>
          </Stack>
        </Box>

        <Snackbar
          open={toast}
          autoHideDuration={3500}
          onClose={() => setToast(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" variant="filled" onClose={() => setToast(false)}>
            Lecture published locally! Sending to admin portal for approval.
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
}