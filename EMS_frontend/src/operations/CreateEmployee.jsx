import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const educationLevels = [
  'High School',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Doctorate',
];

function CreateEmployee() {
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    address: '',
    dateOfBirth: '', // Updated from dob
    educationLevel: '', // Updated from education
    emergencyContactName: '', // Updated from emergencyContact
    emergencyContactPhone: '', // Updated from emergencyPhone
  });
  

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/employees', employeeData);
      setSnackbar({
        open: true,
        message: 'Employee created successfully!',
        severity: 'success',
      });
      // Optionally reset the form
      setEmployeeData({
        name: '',
        email: '',
        position: '',
        department: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        educationLevel: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setSnackbar({
          open: true,
          message: 'Employee already exists!',
          severity: 'warning',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Error creating employee!',
          severity: 'error',
        });
      }
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={14} sm={12} md={10}>
        <Paper elevation={3} sx={{ padding: 6, backgroundColor: 'white' }}>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1c352d' }}>
            Create Employee
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Position"
                  name="position"
                  value={employeeData.position}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={employeeData.department}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={employeeData.phone}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={employeeData.address}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  label="Date of Birth"
  name="dateOfBirth"
  value={employeeData.dateOfBirth}
  onChange={handleChange}
  type="date"
  InputLabelProps={{
    shrink: true,
  }}
  required
/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  select
  label="Education Level"
  name="educationLevel"
  value={employeeData.educationLevel}
  onChange={handleChange}
  required
>
                  {educationLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  label="Emergency Contact Name"
  name="emergencyContactName"
  value={employeeData.emergencyContactName}
  onChange={handleChange}
  required
/>
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
  fullWidth
  label="Emergency Contact Phone"
  name="emergencyContactPhone"
  value={employeeData.emergencyContactPhone}
  onChange={handleChange}
  required
/>
              </Grid>
              <Grid item xs={12}>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#1c352d',
                      '&:hover': { backgroundColor: '#0f2617' },
                    }}
                  >
                    Create Employee
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default CreateEmployee;