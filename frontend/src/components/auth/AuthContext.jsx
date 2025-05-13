// src/components/auth/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getApiUrl } from '../../config';

// Create the context
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get API URL
  const API_URL = getApiUrl();

  // Check if user is logged in on initial load
  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      checkUserAuthentication(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Check if token is valid by calling the /api/auth/me endpoint
  const checkUserAuthentication = async (token) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      const { data } = await axios.get(`${API_URL}/auth/me`, config);
      
      if (data.success) {
        setCurrentUser(data.user);
      } else {
        // If token is invalid, clear it
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Register a new user
  const register = async (username, email, password) => {
    try {
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      
      const { success, token, user, message } = response.data;
      
      if (success && token) {
        // Save token to localStorage
        localStorage.setItem('token', token);
        
        // Set current user
        setCurrentUser(user);
        
        return user;
      } else {
        throw new Error(message || 'Registration failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Login user
  const login = async (username, password) => {
    try {
      setError(null);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
      
      const { success, token, user, message } = response.data;
      
      if (success && token) {
        // Save token to localStorage
        localStorage.setItem('token', token);
        
        // Set current user
        setCurrentUser(user);
        
        return user;
      } else {
        throw new Error(message || 'Login failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Clear current user
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading,
    error
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;