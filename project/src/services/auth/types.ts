import { User } from '../../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface DecodedToken {
  exp?: number;
  iat?: number;
  sub: string;
}

export interface AuthError {
  message: string;
  code?: string;
}