import { axiosInstance } from './axios';
import type {
  User,
  UpdateProfileData,
  ChangePasswordData,
} from '@/types/auth.types';

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await axiosInstance.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<User> => {
    const response = await axiosInstance.patch<User>('/users/me', data);
    return response.data;
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await axiosInstance.patch('/users/me/password', data);
  },
};
