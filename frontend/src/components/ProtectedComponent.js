// src/components/ProtectedComponent.js
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const ProtectedComponent = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authService.getProtectedData();
        setMessage(response.message);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Protected Component</h2>
      <p>{message}</p>
    </div>
  );
};

export default ProtectedComponent;
