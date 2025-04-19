import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Get the redirect path or default to home
  const from = (location.state as any)?.from?.pathname || '/';
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>();
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      setAuthError(null);
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setAuthError('Invalid email or password');
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to access your account
          </p>
        </div>
        
        {authError && (
          <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/30 text-error-500 rounded-md text-sm">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail size={16} />}
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              }
            })}
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock size={16} />}
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              }
            })}
          />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link to="/forgot-password" className="text-primary-600 hover:underline dark:text-primary-400">
                Forgot password?
              </Link>
            </div>
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={<LogIn size={16} />}
          >
            Sign In
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;