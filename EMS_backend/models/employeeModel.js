const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  phone: String,
  address: String,
  dateOfBirth: Date,
  educationLevel: String,
  emergencyContactName: String,
  emergencyContactPhone: String,
});

module.exports = mongoose.model('Employee', EmployeeSchema);
