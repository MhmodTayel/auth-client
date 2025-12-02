import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '@/api/user.api';
import { queryKeys } from '@/api/query-client';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';
import type { UpdateProfileData, ChangePasswordData } from '@/types/auth.types';
import { getErrorMessage } from '@/api/axios';

export const useUser = () => {
  const queryClient = useQueryClient();
  const isAuthenticated = !!storage.getToken();

  const userQuery = useQuery({
    queryKey: queryKeys.user.profile(),
    queryFn: userApi.getProfile,
    enabled: isAuthenticated, // Only fetch if authenticated
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile,
    onSuccess: (data) => {
      // Update cache
      queryClient.setQueryData(queryKeys.user.profile(), data);
      storage.setUser(data);
      logger.info('Profile updated successfully');
    },
    onError: (error) => {
      logger.error('Profile update failed', getErrorMessage(error));
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: userApi.changePassword,
    onSuccess: () => {
      logger.info('Password changed successfully');
    },
    onError: (error) => {
      logger.error('Password change failed', getErrorMessage(error));
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    isError: userQuery.isError,
    error: userQuery.error,

    updateProfile: (data: UpdateProfileData) =>
      updateProfileMutation.mutate(data),
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfileError: updateProfileMutation.error,

    changePassword: (data: ChangePasswordData) =>
      changePasswordMutation.mutate(data),
    isChangingPassword: changePasswordMutation.isPending,
    changePasswordError: changePasswordMutation.error,
  };
};
