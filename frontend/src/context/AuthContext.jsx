import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('zv_user');
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      console.error('Failed to restore Zelvora auth session:', e);
    }
  }, []);

  const login = ({ email, role = 'student' }) => {
    const u = {
      id: role === 'admin' ? 'adm_001' : 'stu_28471',
      email: email || (role === 'admin' ? 'admin@zelvoratech.com' : 'aarav@zelvoratech.com'),
      name: role === 'admin' ? 'Admin Console' : 'Aarav Mehta',
      role,
      avatar: role === 'admin' ? 'https://i.pravatar.cc/120?img=8' : 'https://i.pravatar.cc/120?img=15'
    };
    localStorage.setItem('zv_user', JSON.stringify(u));
    setUser(u);
    return u;
  };

  const logout = () => {
    localStorage.removeItem('zv_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
