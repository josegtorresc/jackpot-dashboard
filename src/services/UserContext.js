import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setPermissions(storedUser.permissions || []);
    }
  }, []);

  const updateUser = (userData) => {
    if (userData && userData.permissions) {
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setPermissions(userData.permissions);
    } else {
      localStorage.removeItem('user');
      setUser(null);
      setPermissions([]);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setPermissions([]);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, permissions, logout }}>
      {children}
    </UserContext.Provider>
  );
};
