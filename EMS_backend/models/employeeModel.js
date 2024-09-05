const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true , unique: true},
  position: { type: String, required: true },
  department: { type: String, required: true },
  phone:{ type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  educationLevel: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactPhone: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;