import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Stack } from '@mui/material';
import { Edit as EditIcon, Close as CloseIcon, Save as SaveIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Shaheer Ahmed',
    contactNumber: '+92 300 1234567',
    academicYear: '3rd Year (Semester 6)',
    specialization: 'Software Engineering',
    enrollmentId: 'SE-2026-089'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Local profile configuration modified and applied successfully.');
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 750, borderRadius: '12px' }}>
      <CardContent sx={{ p: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccountCircleIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Academic Registry Profile
            </Typography>
          </Stack>

          <Button
            variant="contained"
            color={isEditing ? 'error' : 'inherit'}
            startIcon={isEditing ? <CloseIcon /> : <EditIcon />}
            onClick={() => setIsEditing(!isEditing)}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' }
            }}
          >
            {isEditing ? 'Discard Changes' : 'Modify Details'}
          </Button>
        </Stack>

        <Box component="form" onSubmit={handleSaveSubmit}>
          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                value={profile.fullName}
                onChange={handleInputChange}
                disabled
              />
              <TextField
                label="System Enrollment ID"
                name="enrollmentId"
                fullWidth
                value={profile.enrollmentId}
                onChange={handleInputChange}
                disabled
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Contact Phone String"
                name="contactNumber"
                fullWidth
                value={profile.contactNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <TextField
                label="Academic Year Cohort"
                name="academicYear"
                fullWidth
                value={profile.academicYear}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Stack>

            <TextField
              label="Specialization Focus Track"
              name="specialization"
              fullWidth
              value={profile.specialization}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            {isEditing && (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                sx={{
                  alignSelf: 'flex-start',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '15px',
                  px: 3,
                  py: 1.2,
                }}
              >
                Apply Portfolio Updates
              </Button>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}