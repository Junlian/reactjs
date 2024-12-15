import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginCredentials } from '../types/auth';

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const credentials: LoginCredentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    try {
      await login(credentials);
      navigate('/'); // Navigate to home page after successful login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-600 hover:text-green-700">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;