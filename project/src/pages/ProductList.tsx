import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    if (products && products.length > 0) {
      if (selectedCategory === 'all') {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter(p => p.category === selectedCategory));
      }
    }
  }, [products, selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-4">No products available</h2>
        <p className="text-gray-600">Please check back later</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Fresh Products</h1>
      
      {/* Category Filter */}
      <div className="mb-6">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Categories</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.store.name}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{product.store.deliveryTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;