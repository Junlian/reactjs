import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';

const Checkout = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  if (!items.length) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Delivery Address</h2>
            {user?.addresses.map((address) => (
              <div key={address.id} className="mb-4">
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="flex justify-between">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;