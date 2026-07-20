import React from 'react';
import { Card, CardContent, Typography, Chip, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const complianceData = [
  { id: 's1', name: 'Shaheer Ahmed', specialization: 'Software Engineering', completedQuizzes: 4, averageGrade: 92, status: 'Excellent' },
  { id: 's2', name: 'Zain Malik', specialization: 'Computer Science', completedQuizzes: 3, averageGrade: 78, status: 'Satisfactory' },
  { id: 's3', name: 'Hamza Khan', specialization: 'Information Security', completedQuizzes: 1, averageGrade: 45, status: 'Critical Flag' },
];

const statusColor = {
  Excellent: 'success',
  Satisfactory: 'info',
  'Critical Flag': 'error',
};

export default function AdminProgressTracker() {
  const columns = [
    { field: 'name', headerName: 'Student Identity', flex: 1, minWidth: 170, renderCell: (p) => <strong>{p.value}</strong> },
    { field: 'specialization', headerName: 'Enrolled Course Group', flex: 1.1, minWidth: 200 },
    {
      field: 'completedQuizzes',
      headerName: 'Completed Quizzes',
      flex: 0.9,
      minWidth: 170,
      renderCell: (p) => (
        <span>
          <strong>{p.value}</strong> Assessments
        </span>
      ),
    },
    {
      field: 'averageGrade',
      headerName: 'Average Grade Metric',
      flex: 0.8,
      minWidth: 160,
      renderCell: (p) => <strong>{p.value}%</strong>,
    },
    {
      field: 'status',
      headerName: 'Standing Evaluation Status',
      flex: 1,
      minWidth: 190,
      renderCell: (p) => (
        <Chip
          label={p.value}
          size="small"
          color={statusColor[p.value] || 'default'}
          sx={{ fontWeight: 600 }}
        />
      ),
    },
  ];

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 600, mb: 2 }}>
          Cohort Analytics Evaluation Ledger
        </Typography>
        <Box sx={{ height: 360, width: '100%' }}>
          <DataGrid
            rows={complianceData}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true, quickFilterProps: { debounceMs: 300 } } }}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            pageSizeOptions={[10, 25]}
            disableRowSelectionOnClick
            sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: 'action.hover' } }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}