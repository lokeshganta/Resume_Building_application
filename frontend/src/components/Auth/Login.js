// frontend/src/components/Auth/Login.js
import React, { useState } from 'react';
import authService from '../../services/authService';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      await authService.login(credentials);
      // Redirect to the desired page upon successful login
      // You can use React Router or any other navigation method
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
