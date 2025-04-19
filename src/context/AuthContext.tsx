import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType } from '../types';
import { login as loginApi, signup as signupApi, logout as logoutApi, getCurrentUser } from '../services/auth';

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Error checking authentication:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await loginApi(email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const user = await signupApi(name, email, password);
      setUser(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutApi();
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};