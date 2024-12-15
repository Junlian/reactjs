import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-green-600">
            GroceryDash
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-green-600">
              Products
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-green-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {user?.name}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center text-gray-700 hover:text-green-600"
              >
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;