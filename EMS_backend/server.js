// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes')
const authenticateToken = require('./authenticateToken');
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
      const user = await getUserFromDatabase(req.user.id); // Replace with actual DB logic
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ username: user.username });
    } catch (err) {
      console.error(err);
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
