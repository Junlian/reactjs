import api from '../api';
import { LoginResponse, LoginCredentials, RegisterData } from '../../types/auth';

const TOKEN_KEY = 'auth_token';

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem(TOKEN_KEY);
    delete api.defaults.headers.common['Authorization'];
  }
};

export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  setAuthToken(response.data.token);
  return response.data;
};

export const register = async (userData: RegisterData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/register', userData);
  setAuthToken(response.data.token);
  return response.data;
};

export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } finally {
    setAuthToken(null);
  }
};