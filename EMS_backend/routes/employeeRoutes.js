const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const Employee = require('../models/employeeModel');
const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  promoteEmployee,
  getEmployeeList,
} = require('../controllers/employeeController');

router.post('/create', createEmployee);
router.put('/update/:id', updateEmployee);
router.delete('/delete/:id', deleteEmployee);
router.put('/promote/:id', promoteEmployee);
router.get('/list', getEmployeeList);

// Route to get all employees
router.get('/employees', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const employees = await Employee.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .exec();
    const totalEmployees = await Employee.countDocuments(); // Count total documents for pagination
    res.json({ employees, total: totalEmployees });
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Fetch single employee by ID
router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id).exec();
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee details:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});
router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: 'Error creating employee', error });
  }
});
// Promote employee
router.put('/promote/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { position, department } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      id,
      { position, department },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee promoted successfully', employee });
  } catch (error) {
    console.error('Error promoting employee:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Find user by ID from the token
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      name: user.name,
      profilePhoto: user.profilePhoto,
      // Add any other profile details you need
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.delete('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

module.exports = router;
