import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Avatar,
  Fade,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BadgeIcon from '@mui/icons-material/Badge';
import BoltIcon from '@mui/icons-material/Bolt';

const ROLES = [
  {
    key: 'admin',
    label: 'Administrator',
    desc: 'Full system access — manage users, content & analytics.',
    icon: <AdminPanelSettingsIcon sx={{ fontSize: 34 }} />,
    gradient: 'linear-gradient(135deg,#f87171,#dc2626)',
  },
  {
    key: 'instructor',
    label: 'Instructor',
    desc: 'Faculty account — upload lectures, manage classes.',
    icon: <SchoolIcon sx={{ fontSize: 34 }} />,
    gradient: 'linear-gradient(135deg,#34d399,#059669)',
  },
];

// Dynamic options for Class/Semester dropdown
const CLASS_OPTIONS = [
  ...Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
  ...Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`)
];

// Options for Subject/Study Group dropdown
const SUBJECT_OPTIONS = [
  'Pre-Engineering',
  'Pre-Medical',
  'Computer Science'
];

const emptyAdminForm = { username: '', email: '', password: '' };
const emptyInstructorForm = { name: '', cnic: '', qualification: '', subjectOfTeaching: '', classOfTeaching: '' };

function formatCNIC(value) {
  const digits = value.replace(/\D/g, '').slice(0, 13);
  const p1 = digits.slice(0, 5);
  const p2 = digits.slice(5, 12);
  const p3 = digits.slice(12, 13);
  return [p1, p2, p3].filter(Boolean).join('-');
}

export default function AdminCreateUser() {
  const [role, setRole] = useState(null);
  const [adminForm, setAdminForm] = useState(emptyAdminForm);
  const [instructorForm, setInstructorForm] = useState(emptyInstructorForm);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ open: false, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'admin') {
      setToast({ open: true, message: `Administrator "${adminForm.username}" provisioned successfully.` });
      setAdminForm(emptyAdminForm);
    } else if (role === 'instructor') {
      setToast({ open: true, message: `Instructor "${instructorForm.name}" provisioned successfully.` });
      setInstructorForm(emptyInstructorForm);
    }
  };

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto' }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        Who are you creating an account for?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select an account type to reveal its provisioning form.
      </Typography>

      <Grid container spacing={2} sx={{ mb: role ? 3 : 0 }}>
        {ROLES.map((r) => {
          const selected = role === r.key;
          return (
            <Grid item xs={12} sm={6} key={r.key}>
              <Card
                onClick={() => setRole(r.key)}
                variant="outlined"
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  borderWidth: selected ? 2 : 1,
                  borderColor: selected ? 'transparent' : 'divider',
                  transform: selected ? 'translateY(-4px)' : 'none',
                  boxShadow: selected ? 6 : 0,
                  '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' },
                }}
              >
                {selected && (
                  <Box sx={{ position: 'absolute', inset: 0, background: r.gradient, opacity: 0.12 }} />
                )}
                <CardContent sx={{ position: 'relative' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ width: 56, height: 56, background: r.gradient }}>{r.icon}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 700 }}>{r.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{r.desc}</Typography>
                    </Box>
                    {selected && <CheckCircleIcon color="success" />}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Fade in={role === 'admin'} unmountOnExit>
        <Card variant="outlined" sx={{ borderTop: '4px solid #dc2626' }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <AdminPanelSettingsIcon color="error" />
              <Typography sx={{ fontWeight: 600 }}>New Administrator Details</Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Username"
                  required
                  fullWidth
                  value={adminForm.username}
                  onChange={(e) => setAdminForm({ ...adminForm, username: e.target.value })}
                  placeholder="e.g., root_admin"
                  InputProps={{ startAdornment: <InputAdornment position="start"><BadgeIcon fontSize="small" /></InputAdornment> }}
                />
                <TextField
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  value={adminForm.email}
                  onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
                  placeholder="name@domain.edu"
                />
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  fullWidth
                  value={adminForm.password}
                  onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                  placeholder="••••••••"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField label="Role" value="admin" disabled fullWidth helperText="Fixed for this form" />
                <Button type="submit" variant="contained" color="error" size="large" startIcon={<BoltIcon />} sx={{ fontWeight: 600 }}>
                  Create Administrator
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      <Fade in={role === 'instructor'} unmountOnExit>
        <Card variant="outlined" sx={{ borderTop: '4px solid #059669' }}>
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <SchoolIcon sx={{ color: '#059669' }} />
              <Typography sx={{ fontWeight: 600 }}>New Instructor Details</Typography>
            </Stack>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Full Name"
                  required
                  fullWidth
                  value={instructorForm.name}
                  onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                  placeholder="e.g., Prof. Sarah Conner"
                />
                <TextField
                  label="CNIC"
                  required
                  fullWidth
                  value={instructorForm.cnic}
                  onChange={(e) => setInstructorForm({ ...instructorForm, cnic: formatCNIC(e.target.value) })}
                  placeholder="12345-1234567-1"
                  inputProps={{ maxLength: 15 }}
                />
                <TextField
                  label="Qualification"
                  required
                  fullWidth
                  value={instructorForm.qualification}
                  onChange={(e) => setInstructorForm({ ...instructorForm, qualification: e.target.value })}
                  placeholder="e.g., PhD in Computer Science"
                />
                
                {/* Fixed Layout Section: Replaced <Grid> with a reliable responsive row <Stack> */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  sx={{ width: '100%' }}
                >
                  <TextField
                    select
                    label="Subject of Teaching"
                    required
                    fullWidth
                    value={instructorForm.subjectOfTeaching}
                    onChange={(e) => setInstructorForm({ ...instructorForm, subjectOfTeaching: e.target.value })}
                  >
                    {SUBJECT_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Class of Teaching"
                    required
                    fullWidth
                    value={instructorForm.classOfTeaching}
                    onChange={(e) => setInstructorForm({ ...instructorForm, classOfTeaching: e.target.value })}
                  >
                    {CLASS_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Stack>

                <Button type="submit" variant="contained" color="success" size="large" startIcon={<BoltIcon />} sx={{ fontWeight: 600 }}>
                  Create Instructor
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Fade>

      <Snackbar
        open={toast.open}
        autoHideDuration={3500}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}