import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">GroceryDash</h3>
            <p className="text-gray-600">Fresh groceries delivered to your doorstep.</p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-green-600">Products</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-green-600">Cart</Link></li>
              <li><Link to="/orders" className="text-gray-600 hover:text-green-600">Orders</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-600 hover:text-green-600">Contact Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-green-600">FAQ</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-green-600">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold text-gray-800 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-600"><Facebook size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-green-600"><Twitter size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-green-600"><Instagram size={20} /></a>
              <a href="#" className="text-gray-600 hover:text-green-600"><Mail size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} GroceryDash. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;