import React, { createContext, useContext, useState, useEffect } from 'react';
import { authLogin, authRegister, authMe, getApiErrorMessage } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const saved = localStorage.getItem('zv_user');
        if (!saved) return;

        const parsed = JSON.parse(saved);
        if (!parsed?.token) {
          localStorage.removeItem('zv_user');
          return;
        }

        setUser(parsed);

        const { data } = await authMe();
        const userData = { ...data, token: parsed.token };
        localStorage.setItem('zv_user', JSON.stringify(userData));
        setUser(userData);
      } catch (err) {
        console.error('Failed to restore Zelvora auth session:', err);
        localStorage.removeItem('zv_user');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async ({ email, password }) => {
    try {
      const { data } = await authLogin({ email, password });
      const userData = { ...data.user, token: data.token };
      localStorage.setItem('zv_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      return {
        success: false,
        error: getApiErrorMessage(err, 'Login failed. Please check your credentials and try again.'),
      };
    }
  };

  const register = async ({ name, email, password, role = 'student' }) => {
    try {
      const { data } = await authRegister({ name, email, password, role });
      const userData = { ...data.user, token: data.token };
      localStorage.setItem('zv_user', JSON.stringify(userData));
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      return {
        success: false,
        error: getApiErrorMessage(err, 'Registration failed. Please try again.'),
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('zv_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
