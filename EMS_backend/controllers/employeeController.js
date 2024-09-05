const Employee = require('../models/employeeModel');

// Create Employee
//const Employee = require('../models/employeeModel');

// Create Employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, position, department } = req.body;
    const newEmployee = new Employee({ name, email, position, department,dateOfBirth, educationLevel, emergencyContactName, emergencyContactName });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error.message);
    res.status(400).json({ message: error.message });
  }
};


// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const employee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Promote Employee
exports.promoteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, { isPromoted: true }, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Employee List
exports.getEmployeeList = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
