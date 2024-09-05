import axios from 'axios';

const API_URL_auth = 'http://localhost:5000/api/auth';

// frontend/src/services/authService.js


// authService.js
export const register = async (userData) => {
  try {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Missing required fields');
    }

    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error.response || error.message);
    throw error;
  }
};




export const login = async (userData) => {
  try {
    // Attempt to login
    const response = await axios.post(`${API_URL_auth}/login`, userData);
    const data = response.data;

    // Save token to localStorage
    localStorage.setItem('token', data.token);

    try {
      // Fetch user profile information
      const profileResponse = await axios.get('http://localhost:5000/api/profile', {
        headers: { 'Authorization': `Bearer ${data.token}` },
      });

      const profileData = profileResponse.data;

      // Save profile data to localStorage
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', profileData.name);
      localStorage.setItem('profilePhoto', profileData.profilePhoto || 'default-profile.png');
    } catch (profileError) {
      console.error('Profile fetch error:', profileError.response ? profileError.response.data : profileError.message);
      // You might choose to clear the token or handle the profile fetch error differently
    }

    return data; // Returning the data for further use if needed
  } catch (error) {
    // Handle login error
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error; // Optionally re-throw error to be handled by the calling component
  }
};
// authService.js

export const fetchProfile = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/profile', {
      headers: {
        Authorization: `Bearer ${yourToken}` // Include token if required
      }
    });
    return response.data;
  } catch (error) {
    console.error('Profile fetch error:', error.response || error.message);
    throw error;
  }
};

