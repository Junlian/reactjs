import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = () => {
  return (
    <>
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
    </>
  );
};

export default AuthLinks;