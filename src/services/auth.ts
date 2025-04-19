import { User } from '../types';
import { users } from '../utils/mockData';

// Enter your Auth tokens, varna nhi chalega
const AUTH_TOKEN_KEY = 'inkflow_auth_token';
const AUTH_USER_KEY = 'inkflow_auth_user';


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(AUTH_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const login = async (email: string, password: string): Promise<User> => {
  // API Request hai aur delay bhi
  await delay(800);
  
  // Simple user jo same hai uske liye
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  

  const mockToken = `mock-token-${user.id}-${Date.now()}`;
  
  // Aree bhai we need to storee the key so auth store kar raha hu
  localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  
  return user;
};

export const signup = async (name: string, email: string, password: string): Promise<User> => {
  
  await delay(1000);
  
  // Checking if email already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (existingUser) {
    throw new Error('Email already in use');
  }
  
  // Creating new user, karna padega
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
