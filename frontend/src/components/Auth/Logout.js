// frontend/src/components/Auth/Logout.js
import React from 'react';
import authService from '../../services/authService';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await authService.logout();
      // Redirect to the desired page upon successful logout
      // You can use React Router or any other navigation method
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
