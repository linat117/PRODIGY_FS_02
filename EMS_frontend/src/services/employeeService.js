import axios from 'axios';

const API_URL = '/api/employees';

const API_URL_UPDATE = 'http://localhost:5000/api/employees';
//const BASE_URL = 'http://localhost:5000/api';
// Create Employee


export const createEmployee = async (employeeData) => {
  try {
      const response = await axios.post('http://localhost:5000/api/employees/create', employeeData);
      return response.data;
  } catch (error) {
      throw error;
  }
};


// Update Employee

export const fetchEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL_UPDATE}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch employee by ID.');
  }
};

export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${API_URL_UPDATE}/${id}`, employeeData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update employee.');
  }
};

// Delete Employee
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

// Get Employee List
export const getEmployees = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
export const fetchEmployees = async () => {
  const response = await axios.get('http://localhost:5000/api/employees');
  return response.data;
};
