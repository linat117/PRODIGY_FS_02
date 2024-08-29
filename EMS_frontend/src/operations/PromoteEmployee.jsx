import React, { useState, useEffect } from 'react';
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

function PromoteEmployee() {
  const [employees, setEmployees] = useState([]);
  const [promotionData, setPromotionData] = useState({
    employeeId: '',
    newPosition: '',
    newDepartment: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load employees. Please try again later.',
          severity: 'error',
        });
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setPromotionData({ ...promotionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/promote/${promotionData.employeeId}`, {
        position: promotionData.newPosition,
        department: promotionData.newDepartment,
      });
      setSnackbar({
        open: true,
        message: 'Employee promoted successfully!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Error promoting employee:', error);
      setSnackbar({
        open: true,
        message: 'Error promoting employee!',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Grid container justifyContent="center">
      {/* Your existing component structure */}
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

export default PromoteEmployee;
