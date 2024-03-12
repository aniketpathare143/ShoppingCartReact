// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useProductContext } from '../Store/ProductContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setuserId] = useState('');
  const { clearProductCounts } = useProductContext();

  const login = (username, userId) => {
    setIsLoggedIn(true);
    setUsername(username);
    setuserId(userId);
  };

  const logout = () => {
    clearProductCounts();
    setIsLoggedIn(false);
    setUsername('');
    setuserId('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
