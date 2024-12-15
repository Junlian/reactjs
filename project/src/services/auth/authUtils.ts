import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from './types';

export const validateToken = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp > currentTime : false;
  } catch {
    return false;
  }
};

export const getTokenExpiration = (token: string): number | null => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp || null;
  } catch {
    return null;
  }
};