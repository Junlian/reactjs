import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useAuthStatus = () => {
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  return {
    isAuthenticated,
    user,
    token,
    isLoading: false, // Add loading state if needed
  };
};