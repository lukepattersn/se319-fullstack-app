// src/components/auth/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

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

  // Check if user is logged in on initial load
  useEffect(() => {
    const username = getCookie('username');
    if (username) {
      setCurrentUser({ username });
    }
    setLoading(false);
  }, []);

  // Helper function to get cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  // Helper function to set cookie with expiry
  const setCookie = (name, value, days = 7) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  };

  // Function to simulate password hashing (in a real app, use bcrypt)
  const hashPassword = (password) => {
    // This is a simple hash for demo purposes only
    // In a real application, use a proper hashing library
    return btoa(password + "salt");
  };

  // Register a new user
  const register = (username, password) => {
    // Check if username already exists
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      throw new Error("Username already exists");
    }

    // Hash password
    const passwordHash = hashPassword(password);
    
    // Store user in localStorage (in a real app, this would be a database)
    localStorage.setItem(username, JSON.stringify({
      username,
      passwordHash
    }));

    // Set cookies
    setCookie('username', username);
    setCookie('passwordHash', passwordHash);
    
    // Update current user
    setCurrentUser({ username });
    
    return { username };
  };

  // Login user
  const login = (username, password) => {
    // Get user from localStorage
    const userData = localStorage.getItem(username);
    if (!userData) {
      throw new Error("Invalid username or password");
    }

    const user = JSON.parse(userData);
    const passwordHash = hashPassword(password);
    
    // Verify password
    if (user.passwordHash !== passwordHash) {
      throw new Error("Invalid username or password");
    }

    // Set cookies
    setCookie('username', username);
    setCookie('passwordHash', passwordHash);
    
    // Update current user
    setCurrentUser({ username });
    
    return { username };
  };

  // Logout user
  const logout = () => {
    // Clear cookies
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "passwordHash=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Update current user
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;