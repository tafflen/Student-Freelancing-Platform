import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        Student Freelancing
      </Link>

      <div className="nav-links">
        {user ? (
          <>
            {user.role === 'freelancer' && (
              <>
                <Link
                  to="/freelancer"
                  className={`nav-link ${isActive('/freelancer') ? 'active' : ''}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/add-service"
                  className={`nav-link ${isActive('/add-service') ? 'active' : ''}`}
                >
                  Add Service
                </Link>
                <Link
                  to="/requests"
                  className={`nav-link ${isActive('/requests') ? 'active' : ''}`}
                >
                  Requests
                </Link>
              </>
            )}

            {user.role === 'client' && (
              <>
                <Link
                  to="/client"
                  className={`nav-link ${isActive('/client') ? 'active' : ''}`}
                >
                  Browse Services
                </Link>
                <Link
                  to="/requests"
                  className={`nav-link ${isActive('/requests') ? 'active' : ''}`}
                >
                  My Requests
                </Link>
              </>
            )}

            <span className={`role-badge ${user.role}`}>
              {user.name} ({user.role})
            </span>

            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className={`nav-link ${isActive('/login') ? 'active' : ''}`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`nav-link ${isActive('/register') ? 'active' : ''}`}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
