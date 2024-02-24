// frontend/src/components/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Auth/Login';
import Logout from './Auth/Logout';
import ResumeList from './ResumeList';
import ProtectedComponent from './ProtectedComponent';
import authService from '../services/authService';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);
      } catch (error) {
        console.error('Failed to check authentication status:', error);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/login">Login</Link></li>
            {isAuthenticated && (
              <>
                <li><Link to="/resume-list">Resume List</Link></li>
                <li><Link to="/protected">Protected Component</Link></li>
                <li><Link to="/logout">Logout</Link></li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/login">
            <Login />
          </Route>
          {isAuthenticated && (
            <>
              <Route path="/resume-list">
                <ResumeList />
              </Route>
              <Route path="/protected">
                <ProtectedComponent />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
