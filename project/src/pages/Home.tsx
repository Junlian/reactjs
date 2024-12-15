import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Clock, Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-green-50 to-green-100 rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Fresh Groceries Delivered to Your Door
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Shop from local stores and get your groceries delivered in minutes
        </p>
        <Link
          to="/products"
          className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Start Shopping
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="text-center p-6">
          <ShoppingBag className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Wide Selection</h3>
          <p className="text-gray-600">Choose from thousands of fresh products</p>
        </div>
        <div className="text-center p-6">
          <Truck className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your groceries in minutes</p>
        </div>
        <div className="text-center p-6">
          <Clock className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Flexible Timing</h3>
          <p className="text-gray-600">Choose your preferred delivery slot</p>
        </div>
        <div className="text-center p-6">
          <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Secure Shopping</h3>
          <p className="text-gray-600">Safe and secure payment options</p>
        </div>
      </section>
    </div>
  );
};

export default Home;