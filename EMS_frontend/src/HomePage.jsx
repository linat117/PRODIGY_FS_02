import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    // Retrieve username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Fetch total employees count
    const fetchTotalEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees/total');
        setTotalEmployees(response.data.total); // Update the totalEmployees state
      } catch (error) {
        console.error('Error fetching total employees:', error.response || error.message);
      }
    };

    fetchTotalEmployees();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome, {username}</h1>
      <div style={{
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        width: '300px',
        textAlign: 'center'
      }}>
        <h2>Total Employees</h2>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{totalEmployees}</p>
      </div>
    </div>
  );
};

export default HomePage;
