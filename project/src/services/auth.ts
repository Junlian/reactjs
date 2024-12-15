import api from './api';
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

interface LoginResponse {
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};

export const validateToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
  } catch {
    return false;
  }
};