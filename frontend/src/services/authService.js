// frontend/src/services/authService.js
const authService = {
  login: async (credentials) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: async () => {
    try {
      const response = await fetch('http://localhost:5000/auth/check-auth', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  },
};

export default authService;
