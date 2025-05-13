export const getApiUrl = () => {
  // Return API URL from environment variable or fall back to localhost
  return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
};