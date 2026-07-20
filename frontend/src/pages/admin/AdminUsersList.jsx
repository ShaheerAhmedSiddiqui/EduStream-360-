import React, { useMemo } from 'react';
import { Card, CardContent, Typography, Box, Chip, Grid, Avatar, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

const staticUsers = [
  { id: 1, name: 'Principal Controller', identifier: 'root_admin', email: 'root@admin.edu', role: 'admin', details: 'Full System Access' },
  { id: 2, name: 'Dr. Sarah Jenkins', identifier: 'sarah.jenkins', email: 'jenkins@university.edu', role: 'instructor', details: 'Software Engineering · CS-6A' },
  { id: 3, name: 'Prof. Alex Mercer', identifier: 'alex.mercer', email: 'alex@university.edu', role: 'instructor', details: 'Cybersecurity · Sem 6' },
  { id: 4, name: 'Shaheer Ahmed', identifier: 'shaheer@student.edu', email: 'shaheer@student.edu', role: 'student', details: 'Semester 6 - Alpha Group' },
];

const roleColor = { admin: 'error', instructor: 'info', student: 'success' };
const roleIcon = { admin: <AdminPanelSettingsIcon fontSize="small" />, instructor: <SchoolIcon fontSize="small" />, student: <PersonIcon fontSize="small" /> };

function StatCard({ label, value, icon, gradient }) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ background: gradient, width: 48, height: 48 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1 }}>{value}</Typography>
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function AdminUsersList() {
  const stats = useMemo(() => {
    const total = staticUsers.length;
    const admins = staticUsers.filter((u) => u.role === 'admin').length;
    const instructors = staticUsers.filter((u) => u.role === 'instructor').length;
    const students = staticUsers.filter((u) => u.role === 'student').length;
    return { total, admins, instructors, students };
  }, []);

  const columns = [
    {
      field: 'name',
      headerName: 'Identity Name',
      flex: 1,
      minWidth: 200,
      renderCell: (p) => (
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ height: '100%' }}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 13, bgcolor: 'primary.main' }}>
            {p.value.charAt(0).toUpperCase()}
          </Avatar>
          <strong>{p.value}</strong>
        </Stack>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1.1, minWidth: 200 },
    {
      field: 'role',
      headerName: 'Access Role',
      flex: 0.7,
      minWidth: 140,
      renderCell: (p) => (
        <Chip
          icon={roleIcon[p.value]}
          label={p.value}
          size="small"
          color={roleColor[p.value] || 'default'}
          sx={{ fontWeight: 700, fontSize: 11, textTransform: 'uppercase' }}
        />
      ),
    },
    { field: 'details', headerName: 'Metadata Attributes', flex: 1.3, minWidth: 220 },
  ];

  return (
    <Stack spacing={3}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <StatCard label="Total Accounts" value={stats.total} icon={<GroupsIcon />} gradient="linear-gradient(135deg,#38bdf8,#0ea5e9)" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Administrators" value={stats.admins} icon={<AdminPanelSettingsIcon />} gradient="linear-gradient(135deg,#f87171,#dc2626)" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <StatCard label="Instructors" value={stats.instructors} icon={<SchoolIcon />} gradient="linear-gradient(135deg,#34d399,#059669)" />
        </Grid>
      </Grid>

      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
            Active Accounts Registry
          </Typography>
          <Box sx={{ height: 440, width: '100%' }}>
            <DataGrid
              rows={staticUsers}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } } }}
              initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
              pageSizeOptions={[10, 25, 50]}
              disableRowSelectionOnClick
              sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover' } }}
            />
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
}