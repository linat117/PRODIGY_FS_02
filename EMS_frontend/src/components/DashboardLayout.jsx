import React, { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Typography, Avatar, Tooltip } from '@mui/material';
import { Home as HomeIcon, People as PeopleIcon, Add as AddIcon, ArrowForward as ArrowForwardIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

function DashboardLayout() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [open, setOpen] = useState(false); // Closed by default
  const [profile, setProfile] = useState({ name: '', profilePhoto: '' });

  const isSmallScreen = useMediaQuery('(max-width:960px)'); // Detect small and medium screens

  useEffect(() => {
    // Fetch user role and profile data from localStorage or API
    const userRole = localStorage.getItem('role');
    setRole(userRole || 'user');

    const name = localStorage.getItem('name') || 'User';
    const profilePhoto = localStorage.getItem('profilePhoto') || 'default-profile.png';
    setProfile({ name, profilePhoto });
  }, []);

  useEffect(() => {
    // Automatically close the sidebar on small and medium screens
    if (isSmallScreen) {
      setOpen(false);
    }
  }, [isSmallScreen]);

  const handleListItemClick = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant="permanent"
        open={open}
        onClose={toggleSidebar} // Close the sidebar when clicking outside on small screens
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            backgroundColor: '#1c352d',
            color: '#fff',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: open ? 2 : 1 }}>
          <Avatar
            src={profile.profilePhoto}
            alt="Profile Photo"
            sx={{ width: open ? 80 : 40, height: open ? 80 : 40,margin: 6, mb: open ? 1 : 0 }}
          />
          {open && (
            <Typography variant="h6" color="#fff">
              {profile.name}
            </Typography>
          )}
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={toggleSidebar} color="inherit">
            {open ? <ArrowBackIcon /> : <ArrowForwardIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
          <Tooltip title="Home" placement="right" disableHoverListener={open}>
            <ListItem button onClick={() => handleListItemClick('/dashboard/home')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }} />
            </ListItem>
          </Tooltip>
          {role === 'admin' && (
            <>
              <Tooltip title="Employee List" placement="right" disableHoverListener={open}>
                <ListItem button onClick={() => handleListItemClick('/dashboard/employee-list')}>
                  <ListItemIcon>
                    <PeopleIcon sx={{ color: '#fff' }} />
                  </ListItemIcon>
                  <ListItemText primary="Employee List" sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }} />
                </ListItem>
              </Tooltip>
              <Tooltip title="Create Employee" placement="right" disableHoverListener={open}>
                <ListItem button onClick={() => handleListItemClick('/dashboard/create-employee')}>
                  <ListItemIcon>
                    <AddIcon sx={{ color: '#fff' }} />
                  </ListItemIcon>
                  <ListItemText primary="Create Employee" sx={{ opacity: open ? 1 : 0, transition: 'opacity 0.3s' }} />
                </ListItem>
              </Tooltip>
             </>
          )}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5' }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout;
