import { Middleware, AnyAction } from 'redux';
import { syncCart } from '../slices/cartSlice';

let syncTimeout: ReturnType<typeof setTimeout>;

export const cartMiddleware: Middleware = store => next => (action: AnyAction) => {
  const result = next(action);
  
  if (typeof action.type === 'string' && action.type.startsWith('cart/')) {
    if (syncTimeout) {
      clearTimeout(syncTimeout);
    }
    
    syncTimeout = setTimeout(() => {
      store.dispatch(syncCart());
    }, 1000);
  }
  
  return result;
}; 