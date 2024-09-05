// frontend/src/components/Register.js
import React, { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const { username, email, password, role } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const data = await register(formData);
      console.log('Registration successful:', data);
      navigate('/login');
      localStorage.setItem('username', response.data.username);
    } catch (error) {
      console.error('Error during registration:', error.response ? error.response.data : error.message);
    }
  };  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Create Your Account
        </h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            autoComplete='username'
            placeholder="Enter your username"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            autoComplete='current-password'
            placeholder="Enter your password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#1c352d] text-white py-2 px-4 rounded-md hover:bg-[#1c352d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Register
        </button>
        <p className="text-center mt-4 text-sm text-gray-600">
            Already registered?{' '}
            <a href="/login" className="text-[#1c352d] underline">Login here</a>.
          </p>
      </form>
    </div>
  );
}

export default Register;
