import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { FaRegEye, FaEdit, FaTrash } from 'react-icons/fa';
function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(0);
  //const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
  const [educationLevels] = useState(['High School', 'Associate Degree', 'Bachelor’s Degree', 'Master’s Degree', 'Doctorate']);
  const [updatedEmployee, setUpdatedEmployee] = useState({});

  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page
  const [totalRecords, setTotalRecords] = useState(0); 

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(page + 1, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchEmployees = async (page, limit) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees?page=${page}&limit=${limit}`);
      console.log('API Response:', response.data); // Check the response here
  
      const { employees, total } = response.data;
  const totalPages = Math.ceil(totalRecords / rowsPerPage);

      setEmployees(employees || []); // Default to empty array if undefined
      setTotalRecords(total || 0); // Update to use 'total'
      setTotalPages(Math.ceil((total || 0) / limit)); // Update to use 'total'
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };
  
  const handleViewDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToUpdate(employee);
    setUpdatedEmployee({ employee });
    setOpenUpdateDialog(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployeeToDelete(employeeId);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteEmployee = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/employees/${employeeToDelete}`);
      if (response.status === 200) {
        setEmployees(employees.filter((employee) => employee._id !== employeeToDelete));
        setOpenDeleteDialog(false);
        setEmployeeToDelete(null);
        fetchEmployees();
      } else {
        console.error('Failed to delete employee:', response.status);
      }
    } catch (error) {
      console.error('Error deleting employee:', error.message);
    }
  };

  const handleCloseDetailsDialog = () => {
    setSelectedEmployee(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dateOfBirth') {
      // Convert ISO date string to yyyy-MM-dd format
      const formattedDate = new Date(value).toISOString().split('T')[0];
      setUpdatedEmployee(prev => ({ ...prev, [name]: formattedDate }));
    } else {
      setUpdatedEmployee(prev => ({ ...prev, [name]: value }));
    }
  };
  

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting update for:', updatedEmployee);
  
      // Convert date to ISO format if necessary
      const formattedDate = new Date(updatedEmployee.dateOfBirth).toISOString();
      const dataToUpdate = { ...updatedEmployee, dateOfBirth: formattedDate };
  
      const response = await axios.put(`http://localhost:5000/api/employees/${employeeToUpdate._id}`, dataToUpdate);
  
      if (response.status === 200) {
        setEmployees(employees.map(emp => emp._id === employeeToUpdate._id ? response.data : emp));
        setOpenUpdateDialog(true);
        setEmployeeToUpdate(employee);
        
      } else {
        console.error('Failed to update employee:', response.status);
      }
    } catch (error) {
      console.error('Error updating employee:', error.response?.data || error.message);
    }
  };
  
  
  const handleCancelUpdate = () => {
    setOpenUpdateDialog(false);
    setEmployeeToUpdate(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };
  
  console.log('Employees:', employees);
console.log('Total Records:', totalRecords); // Should reflect the value from API
console.log('Rows Per Page:', rowsPerPage);
console.log('Current Page:', page);


  return (
    <TableContainer component={Paper} style={{ padding: '16px' }}>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: '#1c352d', color: 'white' }}>
            <TableCell style={{ color: 'white' }}>No</TableCell>
            <TableCell style={{ color: 'white' }}>Name</TableCell>
            <TableCell style={{ color: 'white' }}>Email</TableCell>
            <TableCell style={{ color: 'white' }}>Position</TableCell>
            <TableCell style={{ color: 'white' }}>Department</TableCell>
            <TableCell style={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee, index) => (
            <TableRow
              key={employee._id}
              sx={{
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  cursor: 'pointer'
                }
              }}
            >
              <TableCell>{page * rowsPerPage + index + 1}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <div style={{ display: 'inline-flex', gap: '8px' }}>
                  <FaRegEye
                    style={{ cursor: 'pointer' }}
                    title="View Details"
                    onClick={() => handleViewDetails(employee)}
                  />
                  <FaEdit
                    style={{ cursor: 'pointer' }}
                    title="Edit"
                    onClick={() => handleEditEmployee(employee)}
                  />
                  <FaTrash
                    style={{ cursor: 'pointer', color: '#d32f2f' }}
                    title="Delete"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
  rowsPerPageOptions={[5, 10, 25, 50]}
  component="div"
  count={totalRecords} // Ensure count is a number
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
/>





      {/* Details Dialog */}
      <Dialog
        open={Boolean(selectedEmployee)}
        onClose={handleCloseDetailsDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ backgroundColor: '#1c352d', color: 'white' }}>
          Employee Details
        </DialogTitle>
        <DialogContent>
          {selectedEmployee ? (
            <>
              <Typography><strong>Name:</strong> {selectedEmployee.name || 'N/A'}</Typography>
              <Typography><strong>Email:</strong> {selectedEmployee.email || 'N/A'}</Typography>
              <Typography><strong>Position:</strong> {selectedEmployee.position || 'N/A'}</Typography>
              <Typography><strong>Department:</strong> {selectedEmployee.department || 'N/A'}</Typography>
              <Typography><strong>Date of Birth:</strong> {selectedEmployee.dateOfBirth || 'N/A'}</Typography>
              <Typography><strong>Education Level:</strong> {selectedEmployee.educationLevel || 'N/A'}</Typography>
              <Typography><strong>Emergency Contact Name:</strong> {selectedEmployee.emergencyContactName || 'N/A'}</Typography>
              <Typography><strong>Emergency Contact Phone:</strong> {selectedEmployee.emergencyContactPhone || 'N/A'}</Typography>
            </>
          ) : (
            <Typography>No details available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetailsDialog} style={{ backgroundColor: '#d32f2f', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Employee Dialog */}
      <Dialog
        open={Boolean(employeeToUpdate)}
        onClose={handleCancelUpdate}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ backgroundColor: '#1c352d', color: 'white' }}>
          Update Employee
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              label="Name"
              name="name"
              value={updatedEmployee.name || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={updatedEmployee.email || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Position"
              name="position"
              value={updatedEmployee.position || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Department"
              name="department"
              value={updatedEmployee.department || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
           <TextField
  label="Date of Birth"
  name="dateOfBirth"
  type="date"
  value={updatedEmployee.dateOfBirth ? new Date(updatedEmployee.dateOfBirth).toISOString().split('T')[0] : ''}
  onChange={handleUpdateChange}
  fullWidth
  margin="normal"
  InputLabelProps={{ shrink: true }}
/>

            <FormControl fullWidth margin="normal">
              <InputLabel>Education Level</InputLabel>
              <Select
                name="educationLevel"
                value={updatedEmployee.educationLevel || ''}
                onChange={handleUpdateChange}
              >
                {educationLevels.map((level) => (
                  <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Emergency Contact Name"
              name="emergencyContactName"
              value={updatedEmployee.emergencyContactName || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Emergency Contact Phone"
              name="emergencyContactPhone"
              value={updatedEmployee.emergencyContactPhone || ''}
              onChange={handleUpdateChange}
              fullWidth
              margin="normal"
            />
            <DialogActions>
              <Button type="submit" style={{ backgroundColor: '#1c352d', color: 'white' }}>
                Update
              </Button>
              <Button onClick={handleCancelUpdate} style={{ backgroundColor: '#d32f2f', color: 'white' }}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ backgroundColor: '#1c352d', color: 'white' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDeleteEmployee} style={{ backgroundColor: '#d32f2f', color: 'white' }}>
            Delete
          </Button>
          <Button onClick={() => setOpenDeleteDialog(false)} style={{ backgroundColor: '#1c352d', color: 'white' }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}

export default EmployeeList;
