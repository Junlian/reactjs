import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addToCart, updateQuantity, removeItem, clearCart } from '../store/slices/cartSlice';
import { Product, CartItem } from '../types';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, total, loading, error } = useSelector((state: RootState) => state.cart);

  const handleAddToCart = async (product: Product, quantity = 1) => {
    try {
      await dispatch(addToCart({ product, quantity })).unwrap();
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ productId, quantity }));
    } else {
      dispatch(removeItem(productId));
    }
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getCartSummary = () => {
    const itemCount = items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
    return {
      itemCount,
      total,
    };
  };

  return {
    items,
    total,
    loading,
    error,
    addToCart: handleAddToCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    clearCart: handleClearCart,
    getCartSummary,
  };
}; 