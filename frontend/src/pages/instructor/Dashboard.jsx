import React, { useState, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import PublishedLectures from './PublishedLectures';
import UploadLecture from './UploadLecture';

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
  ListAlt as ListAltIcon,
  AddCircle as AddCircleIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;
const DRAWER_WIDTH_COLLAPSED = 72;

const NAV_ITEMS = [
  { key: 'published', label: 'Published Lectures', icon: <ListAltIcon /> },
  { key: 'upload', label: 'Upload New Lecture', icon: <AddCircleIcon /> },
];

const PAGE_TITLES = {
  published: 'Curriculum Repository Rows',
  upload: 'Publish New Learning Material',
};

export default function InstructorDashboard() {
  const { logout, user } = useAuth();
  const [currentView, setCurrentView] = useState('published');
  const [collapsed, setCollapsed] = useState(false);
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark'
            ? {
                background: { default: '#0a1512', paper: '#0f211a' },
                primary: { main: '#34d399' },
              }
            : {
                background: { default: '#f8fafc', paper: '#ffffff' },
                primary: { main: '#004124' },
              }),
        },
        shape: { borderRadius: 10 },
      }),
    [mode]
  );

  const renderContentView = () => {
    switch (currentView) {
      case 'published':
        return <PublishedLectures />;
      case 'upload':
        return <UploadLecture />;
      default:
        return <PublishedLectures />;
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
              bgcolor: '#061f14',
              color: '#fff',
              borderRight: 'none',
            },
          }}
        >
          <Toolbar sx={{ px: 2, gap: 1 }}>
            <IconButton onClick={() => setCollapsed((c) => !c)} sx={{ color: '#a3cfbb' }}>
              <MenuIcon />
            </IconButton>
            {!collapsed && (
              <Stack sx={{ overflow: 'hidden' }}>
                <Typography noWrap sx={{ fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                  Faculty Portal
                </Typography>
                <Typography noWrap variant="caption" sx={{ color: '#a3cfbb' }}>
                  Instructor Management
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
                  sx={{ bgcolor: 'transparent', color: '#a3cfbb', fontSize: 12, fontWeight: 700, lineHeight: '32px' }}
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
                    color: active ? '#fff' : '#cbd5e1',
                    '&.Mui-selected': { bgcolor: 'rgba(255,255,255,0.15)' },
                    '&.Mui-selected:hover': { bgcolor: 'rgba(255,255,255,0.18)' },
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: collapsed ? 0 : 2,
                      justifyContent: 'center',
                      color: active ? '#fff' : '#cbd5e1',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 14, fontWeight: active ? 600 : 500 }} />}
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
            <Tooltip title={collapsed ? 'Sign Out' : ''} placement="right">
              <ListItemButton
                onClick={logout}
                sx={{
                  borderRadius: 2,
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.25)',
                  '&:hover': { borderColor: '#fff', bgcolor: 'rgba(255,255,255,0.05)' },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 2, color: '#fff', justifyContent: 'center' }}>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                {!collapsed && <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }} />}
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
                  <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: '#004124' }}>
                    {(user?.name || 'I').charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    Welcome, Professor{' '}
                    <strong style={{ color: theme.palette.text.primary }}>{user?.name || 'Instructor'}</strong>
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