import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { login, logout, register } from '../store/slices/authSlice';
import { LoginCredentials, RegisterData } from '../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const result = await dispatch(login(credentials)).unwrap();
      if (result) {
        navigate('/');
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleRegister = async (userData: RegisterData) => {
    try {
      const result = await dispatch(register(userData)).unwrap();
      if (result) {
        navigate('/');
      }
      return result;
    } catch (error) {
      throw error;
    }
  };

  return {
    ...auth,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};