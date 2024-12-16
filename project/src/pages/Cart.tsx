import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { RootState } from '../store';
import { updateQuantity, removeFromCart } from '../store/slices/cartSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    try {
      setIsLoading(true);
      if (newQuantity > 0) {
        await dispatch(updateQuantity({ productId, quantity: newQuantity }));
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <Link
          to="/products"
          className="text-green-600 hover:text-green-700 font-medium"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            
            <div className="flex-grow ml-4">
              <h3 className="font-semibold text-lg">{item.product.name}</h3>
              <p className="text-gray-600 text-sm">{item.product.store.name}</p>
              <p className="text-green-600 font-bold mt-1">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button
                onClick={() => handleRemoveItem(item.product.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between mb-4">
          <span className="font-semibold">Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-6">
          <span className="font-semibold">Delivery Fee:</span>
          <span>$5.00</span>
        </div>
        <div className="flex justify-between mb-6 text-lg font-bold">
          <span>Total:</span>
          <span>${(total + 5).toFixed(2)}</span>
        </div>
        
        {isAuthenticated ? (
          <Link
            to="/checkout"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </Link>
        ) : (
          <Link
            to="/login"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
          >
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;