import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterData } from '../types/auth';

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData: RegisterData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    
    try {
      await register(userData);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              minLength={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-green-600 hover:text-green-700">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register; 