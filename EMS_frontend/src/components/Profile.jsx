import React, { useState, useContext } from 'react';
import { TextField, Button, Grid, Paper, Typography, Box } from '@mui/material';
import axios from 'axios';
import ProfileContext from '../context/ProfileContext';

function Profile() {
  const { profile, setProfile } = useContext(ProfileContext);
  const [profileData, setProfileData] = useState({
    name: profile.name || '',
    profilePhoto: null,
  });
  const [previewPhoto, setPreviewPhoto] = useState(profile.profilePhoto ? URL.createObjectURL(profile.profilePhoto) : null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      setProfileData({ ...profileData, [name]: files[0] });
      setPreviewPhoto(URL.createObjectURL(files[0]));
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profileData.name);
    if (profileData.profilePhoto) {
      formData.append('profilePhoto', profileData.profilePhoto);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated:', response.data);
      
      // Update the global profile state
      setProfile({
        name: profileData.name,
        profilePhoto: profileData.profilePhoto,
      });
    } catch (error) {
      console.error('Error updating profile:', error.response || error.message);
    }
  };

  return (
    <Grid container justifyContent="center">
    <Grid item xs={12} sm={8} md={6}>
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#f9fbe7' }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: '#1c352d' }}>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} textAlign="center">
              <Box>
                {previewPhoto ? (
                  <img
                    src={previewPhoto}
                    alt="Profile Preview"
                    style={{ width: 100, height: 100, borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: '50%',
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    No Image
                  </div>
                )}
              </Box>
              <input
                type="file"
                name="profilePhoto"
                accept="image/*"
                onChange={handleChange}
                style={{ marginTop: 10 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: '#1c352d',
                    '&:hover': { backgroundColor: '#0f2617' },
                  }}
                >
                  Save Changes
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  </Grid>
  );
}

export default Profile;

