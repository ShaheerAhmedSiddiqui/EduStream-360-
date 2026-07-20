import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminUsersList from './AdminUsersList';
import AdminCreateUser from './AdminCreateUser';
import AdminLecturesQueue from './AdminLecturesQueue';
import AdminProgressTracker from './AdminProgressTracker';

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  Drawer,
  Toolbar,
  AppBar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Stack,
} from '@mui/material';

import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Groups as GroupsIcon,
  PeopleAlt as PeopleAltIcon,
  PersonAddAlt1  as PersonAddAlt1Icon,
  FactCheck as FactCheckIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

const NAV_ITEMS = [
  { key: 'users-list', label: 'All Users', icon: <GroupsIcon /> },
  { key: 'users-create', label: 'Create Admin / Instructor', icon: <PersonAddAlt1Icon /> },
  { key: 'lectures-queue', label: 'Lecture Approval Queue', icon: <FactCheckIcon /> },
  { key: 'student-progress', label: 'Analytics & Student Progress', icon: <BarChartIcon /> },
]

const PAGE_TITLES = {
  'users-list': 'Account Profiles & Registry Systems',
  'users-create': 'Provision New System Credentials',
  'lectures-queue': 'Content Audit Verification Pipeline',
  'student-progress': 'Academic Progress Metrics',
};

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('users-list');
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: { default: '#0b1220', paper: '#0f172a' },
                primary: { main: '#38bdf8' },
              }
            : {
                background: { default: '#f8fafc', paper: '#ffffff' },
                primary: { main: '#0f172a' },
              }),
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  const renderContentView = () => {
  switch (currentView) {
    case 'users-list':
      return <AdminUsersList />;
    case 'users-create':
      return <AdminCreateUser />;
    case 'lectures-queue':
      return <AdminLecturesQueue />;
    case 'student-progress':
      return <AdminProgressTracker />;
    default:
      return <AdminUsersList />;
  }
};

  const drawerWidth = collapsed ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* SIDEBAR */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            transition: (t) => t.transitions.create('width'),
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              overflowX: 'hidden',
              transition: (t) => t.transitions.create('width'),
              bgcolor: mode === 'dark' ? '#0f172a' : '#0f172a',
              color: '#fff',
              borderRight: 'none',
            },
          }}
        >
          <Toolbar sx={{ px: 2, gap: 1 }}>
            <IconButton onClick={() => setCollapsed((c) => !c)} sx={{ color: '#94a3b8' }}>
              <MenuIcon />
            </IconButton>
            {!collapsed && (
              <Stack sx={{ overflow: 'hidden' }}>
                <Typography noWrap sx={{ fontWeight: 700, color: '#38bdf8', letterSpacing: '-0.5px' }}>
                  Root Console
                </Typography>
                <Typography noWrap variant="caption" sx={{ color: '#94a3b8' }}>
                  System Administration
                </Typography>
              </Stack>
            )}
          </Toolbar>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          <List
            sx={{ flexGrow: 1, px: 1, pt: 1 }}
            subheader={
              !collapsed ? (
                <ListSubheader
                  component="div"
                  sx={{ bgcolor: 'transparent', color: '#64748b', fontSize: 12, fontWeight: 700, lineHeight: '32px' }}
                >
                  Main items
                </ListSubheader>
              ) : null
            }
          >
            {NAV_ITEMS.map((item) => {
              const active = currentView === item.key;
              const button = (
                <ListItemButton
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  selected={active}
                  sx={{
                    borderRadius: 2,
                    mb: 0.5,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    color: active ? '#38bdf8' : '#cbd5e1',
                    '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.08)' },
                    '&.Mui-selected:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: 'center',
                      color: active ? '#38bdf8' : '#cbd5e1',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />}
                </ListItemButton>
              );
              return (
                <ListItem key={item.key} disablePadding sx={{ display: 'block' }}>
                  {collapsed ? (
                    <Tooltip title={item.label} placement="right">
                      {button}
                    </Tooltip>
                  ) : (
                    button
                  )}
                </ListItem>
              );
            })}
          </List>

          <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

          <Box sx={{ p: 1 }}>
            <Tooltip title={collapsed ? 'Terminate Session' : ''} placement="right">
              <ListItemButton
                onClick={logout}
                sx={{
                  borderRadius: 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color: '#ef4444',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, color: '#ef4444', justifyContent: 'center' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Terminate Session" primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />}
              </ListItemButton>
            </Tooltip>
          </Box>
        </Drawer>

        {/* MAIN VIEWPORT */}
        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <AppBar
            position="static"
            elevation={0}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ fontSize: 18, fontWeight: 600 }}>
                {PAGE_TITLES[currentView]}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
                  <IconButton onClick={() => setMode((m) => (m === 'dark' ? 'light' : 'dark'))}>
                    {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar sx={{ width: 32, height: 32, fontSize: 14 }}>
                    {(user?.name || 'A').charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    <strong style={{ color: theme.palette.text.primary }}>{user?.name || 'Root Administrator'}</strong>
                  </Typography>
                </Stack>
              </Stack>
            </Toolbar>
          </AppBar>

          <Box sx={{ p: 4, flexGrow: 1, overflowY: 'auto', bgcolor: 'background.default' }}>
            {renderContentView()}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}