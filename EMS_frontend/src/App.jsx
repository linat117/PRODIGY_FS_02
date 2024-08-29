import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout'; // Update the import path if necessary
import HomePage from './HomePage';
import EmployeeList from './operations/EmployeeList';
import CreateEmployee from './operations/CreateEmployee';
import PromoteEmployee from './operations/PromoteEmployee';
import Login from './components/Login';
import Register from './components/Register';
//import ErrorBoundary from './ErrorBoundary';
import Profile from './components/Profile';
import {ProfileContextProvider} from './context/ProfileContext';
//import Home from './pages/Home'; // Update the import path if necessary
//import EmployeeList from './pages/EmployeeList'; // Update the import path if necessary
//import CreateEmployee from './pages/CreateEmployee'; // Update the import path if necessary
//import UpdateEmployee from './pages/UpdateEmployee'; // Update the import path if necessary
//import DeleteEmployee from './pages/DeleteEmployee'; // Update the import path if necessary
//import Login from './pages/Login'; // Update the import path if necessary
//import Register from './pages/Register'; // Update the import path if necessary

function App() {
  return (
    <ProfileContextProvider>
    <Router>
    
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes - Wrapped with DashboardLayout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="home" element={<HomePage />} />
          <Route path="employee-list" element={<EmployeeList />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          
          <Route path="promote-employee" element={<PromoteEmployee />} />
          <Route path="profile" element={<Profile />} />
       
        </Route>
         {/* Redirect to login if no match */}
        <Route path="*" element={<Login />} />
      </Routes>
     
    </Router>
    </ProfileContextProvider>
  );
}

export default App;
