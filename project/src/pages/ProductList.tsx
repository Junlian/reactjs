import React from 'react';
import { Link } from 'react-router-dom';

// Temporary mock data
const products = [
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    description: 'Sweet and nutritious organic bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=500&q=80',
    category: 'Fruits',
    store: {
      id: '1',
      name: 'Fresh Market',
      rating: 4.5,
      deliveryTime: '30-45 min',
    },
    stock: 50,
  },
  // Add more mock products as needed
];

const ProductList = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Fresh Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
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
                <span className="text-green-600 font-bold">${product.price}</span>
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