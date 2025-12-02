import { axiosInstance } from './axios';
import type { SignUpData, SignInData, AuthResponse } from '@/types/auth.types';

export const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/signup',
      data
    );
    return response.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      '/auth/signin',
      data
    );
    return response.data;
  },

  healthCheck: async (): Promise<{ message: string; timestamp: string }> => {
    const response = await axiosInstance.get('/');
    return response.data;
  },
};
