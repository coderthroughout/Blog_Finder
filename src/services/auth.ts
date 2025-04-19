import { User } from '../types';
import { users } from '../utils/mockData';


const AUTH_TOKEN_KEY = 'inkflow_auth_token';
const AUTH_USER_KEY = 'inkflow_auth_user';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API request
  await delay(800);
  
  // Find user with matching email (in a real app, this would check password hash too)
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // In a real app, this would be a JWT token from the server
  const mockToken = `mock-token-${user.id}-${Date.now()}`;
  
  // Store auth data
  localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  
  return user;
};

export const signup = async (name: string, email: string, password: string): Promise<User> => {
  // Simulate API request
  await delay(1000);
  
  // Check if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    throw new Error('Email already in use');
  }
  
  // Create new user (in a real app, this would store in database)
  const newUser: User = {
    id: `${users.length + 1}`,
    name,
    email,
    createdAt: new Date().toISOString(),
  };
  
 
  const mockToken = `mock-token-${newUser.id}-${Date.now()}`;
  
  
  localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(newUser));
  
  return newUser;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};