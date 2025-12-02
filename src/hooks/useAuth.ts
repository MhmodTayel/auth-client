import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/api/auth.api';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';
import { ROUTES, queryKeys } from '@/utils/constants';
import type { SignUpData, SignInData } from '@/types/auth.types';
import { getErrorMessage } from '@/api/axios';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const signUpMutation = useMutation({
    mutationFn: authApi.signUp,
    onSuccess: (data) => {
      storage.setToken(data.access_token);
      storage.setUser(data.user);
      logger.info('User signed up successfully', { userId: data.user.id });

      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });

      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      logger.error('Sign up failed', getErrorMessage(error));
    },
  });

  const signInMutation = useMutation({
    mutationFn: authApi.signIn,
    onSuccess: (data) => {
      storage.setToken(data.access_token);
      storage.setUser(data.user);
      logger.info('User signed in successfully', { userId: data.user.id });

      queryClient.invalidateQueries({ queryKey: queryKeys.user.all });

      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      logger.error('Sign in failed', getErrorMessage(error));
    },
  });

  const logout = () => {
    storage.clear();
    queryClient.clear();
    logger.info('User logged out');
    navigate(ROUTES.SIGN_IN);
  };

  const isAuthenticated = !!storage.getToken();

  return {
    signUp: (data: SignUpData) => signUpMutation.mutate(data),
    signIn: (data: SignInData) => signInMutation.mutate(data),
    logout,
    isAuthenticated,
    isSigningUp: signUpMutation.isPending,
    isSigningIn: signInMutation.isPending,
    signUpError: signUpMutation.error,
    signInError: signInMutation.error,
  };
};
