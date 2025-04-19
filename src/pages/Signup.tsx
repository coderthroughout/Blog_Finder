import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState<string | null>(null);
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<SignupFormValues>();
  const password = watch('password');
  
  const onSubmit = async (data: SignupFormValues) => {
    try {
      setAuthError(null);
      await signup(data.name, data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Signup error:', error);
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('An error occurred during signup');
      }
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create an account</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join our community of writers and readers
          </p>
        </div>
        
        {authError && (
          <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/30 text-error-500 rounded-md text-sm">
            {authError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Name"
            placeholder="Enter your full name"
            leftIcon={<User size={16} />}
            error={errors.name?.message}
            {...register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              }
            })}
          />
          
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
            placeholder="Create a password"
            leftIcon={<Lock size={16} />}
            error={errors.password?.message}
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must include uppercase, lowercase, number and special character',
              }
            })}
          />
          
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            leftIcon={<Lock size={16} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => 
                value === password || 'The passwords do not match',
            })}
          />
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <Link to="/terms" className="text-primary-600 hover:underline dark:text-primary-400">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-primary-600 hover:underline dark:text-primary-400">
                Privacy Policy
              </Link>
            </label>
          </div>
          
          <Button
            type="submit"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={<UserPlus size={16} />}
          >
            Create Account
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;