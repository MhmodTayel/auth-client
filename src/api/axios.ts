import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/utils/constants';
import { storage } from '@/utils/storage';
import { logger } from '@/utils/logger';
import type { ApiError } from '@/types/api.types';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    logger.debug('API Request', {
      method: config.method,
      url: config.url,
    });
    return config;
  },
  (error: AxiosError) => {
    logger.error('Request Error', error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    logger.debug('API Response', {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const { status, data } = error.response;

      logger.error('API Error', {
        status,
        message: data.message,
        url: error.config?.url,
      });

      if (status === 401) {
        storage.clear();
      }

      if (status === 403) {
        logger.warn('Access forbidden', data);
      }

      if (status >= 500) {
        logger.error('Server error', data);
      }
    } else if (error.request) {
      logger.error('Network Error', error.message);
    } else {
      logger.error('Request Setup Error', error.message);
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiError>;
    return axiosError.response?.data?.message || error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
