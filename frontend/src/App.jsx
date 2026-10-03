import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import FreelancerDashboard from './pages/FreelancerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import AddService from './pages/AddService';
import EditService from './pages/EditService';
import ServiceDetails from './pages/ServiceDetails';
import MyRequests from './pages/MyRequests';
import './App.css';

function App() {
  // Read user from localStorage on application startup
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="main-content">
          <Routes>
            {/* Root redirect based on authentication and role */}
            <Route
              path="/"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'freelancer' ? (
                  <Navigate to="/freelancer" replace />
                ) : (
                  <Navigate to="/client" replace />
                )
              }
            />

            {/* Login Route */}
            <Route
              path="/login"
              element={
                user ? (
                  <Navigate
                    to={user.role === 'freelancer' ? '/freelancer' : '/client'}
                    replace
                  />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />

            {/* Register Route */}
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate
                    to={user.role === 'freelancer' ? '/freelancer' : '/client'}
                    replace
                  />
                ) : (
                  <Register />
                )
              }
            />

            {/* Client Dashboard: Client Only */}
            <Route
              path="/client"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'client' ? (
                  <ClientDashboard user={user} />
                ) : (
                  <Navigate to="/freelancer" replace />
                )
              }
            />

            {/* Service Details: Client Only */}
            <Route
              path="/service/:id"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'client' ? (
                  <ServiceDetails user={user} />
                ) : (
                  <Navigate to="/freelancer" replace />
                )
              }
            />

            {/* Freelancer Dashboard: Freelancer Only */}
            <Route
              path="/freelancer"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'freelancer' ? (
                  <FreelancerDashboard user={user} />
                ) : (
                  <Navigate to="/client" replace />
                )
              }
            />

            {/* Add Service: Freelancer Only */}
            <Route
              path="/add-service"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'freelancer' ? (
                  <AddService user={user} />
                ) : (
                  <Navigate to="/client" replace />
                )
              }
            />

            {/* Edit Service: Freelancer Only */}
            <Route
              path="/edit-service/:id"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : user.role === 'freelancer' ? (
                  <EditService user={user} />
                ) : (
                  <Navigate to="/client" replace />
                )
              }
            />

            {/* My Requests: Available to both Client and Freelancer */}
            <Route
              path="/requests"
              element={
                !user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <MyRequests user={user} />
                )
              }
            />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
