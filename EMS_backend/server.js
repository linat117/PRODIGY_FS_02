// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes')
const authenticateToken = require('./authenticateToken');
const Employee = require('./models/employeeModel');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api', employeeRoutes);


  
  // Define the GET route for employees
  app.get('/api/profile', async (req, res) => {
    try {
      // Assuming you have the user ID from the authentication token
      const userId = req.user.id;
      const user = await User.findById(userId); // Adjust based on your schema
      res.json({ username: user.username });
    } catch (error) {
      console.error('Profile fetch error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
   app.get('/api/employees/total', async (req, res) => {
    try {
      console.log('Fetching total employees...');
      const totalEmployees = await Employee.countDocuments();
      console.log('Total employees:', totalEmployees);
      res.json({ total: totalEmployees });
    } catch (error) {
      console.error('Error fetching total employees:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
app.get('/test', (req, res) => {
    res.send('Test route working directly in server.js');
});
app.delete('/api/employees/:id', async (req, res) => {
  try {
    const employeeId = req.params.id;
    const result = await Employee.findByIdAndDelete(employeeId); // Assuming Mongoose

    if (!result) {
      return res.status(404).send({ message: 'Employee not found' });
    }

    res.status(200).send({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send({ message: 'Server error' });
  }
});
app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post('/api/employees', async (req, res) => {
  const { name, email, position, department, phone, address, dob, education, emergencyContact, emergencyPhone } = req.body;

  // You might have validation in place, ensure it's capturing all fields
  if (!name || !email || !position || !department || !phone || !address || !dob || !education || !emergencyContact || !emergencyPhone) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newEmployee = new Employee({
      name,
      email,
      position,
      department,
      phone,
      address,
      dateOfBirth,
      educationlevel,
      emergencyContactName,
      emergencyContactPhone
    });

    await newEmployee.save();
    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee', error });
  }
});
app.put('/api/employees/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, position, department } = req.body;

    // Ensure all required fields are present
    if (!name || !email || !position || !department) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for duplicate email
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee && existingEmployee._id.toString() !== id) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    // Update employee
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      name,
      email,
      position,
      department
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});




//pagination  
app.get('/api/employees', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    const totalEmployees = await Employee.countDocuments();

    res.json({
      employees,
      totalPages: Math.ceil(totalEmployees / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    // Fetch employees with pagination
    const employees = await Employee.find().skip(skip).limit(Number(limit));
    
    // Count total records
    const totalRecords = await Employee.countDocuments();

    res.json({
      employees,
      totalRecords
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Server error');
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
