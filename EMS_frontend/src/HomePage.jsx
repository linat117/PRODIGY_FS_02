import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsername(response.data.username);
      } catch (err) {
        console.error('Error fetching user information:', err);
        setError('Failed to fetch user information');
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1c352d', color: '#fff' }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {username}!
        </Typography>
        {/* Rest of your content */}
      </Paper>
    </Container>
  );
};

export default HomePage;
