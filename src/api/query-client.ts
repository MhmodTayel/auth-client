import { QueryClient } from '@tanstack/react-query';
import { logger } from '@/utils/logger';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Stale time: how long data is considered fresh
      staleTime: 1000 * 60 * 5, // 5 minutes

      // Cache time: how long unused data stays in cache
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)

      // Retry configuration
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error instanceof Error && 'response' in error) {
          const status = (error as any).response?.status;
          if (status && status >= 400 && status < 500) {
            return false;
          }
        }
        return failureCount < 2;
      },

      // Refetch configuration
      refetchOnWindowFocus: false, // Don't refetch on window focus in dev
      refetchOnReconnect: true,
      refetchOnMount: true,
    },
    mutations: {
      // Global mutation error handler
      onError: (error) => {
        logger.error('Mutation Error', error);
      },
    },
  },
});

// Query keys factory for type-safety and consistency
export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    healthCheck: () => [...queryKeys.auth.all, 'health'] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
} as const;
