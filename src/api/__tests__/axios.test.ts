import { describe, it, expect } from 'vitest';
import { AxiosError } from 'axios';
import { getErrorMessage } from '../axios';
import type { ApiError } from '@/types/api.types';

describe('getErrorMessage', () => {
  it('should extract message from Axios error with response', () => {
    const apiError: ApiError = {
      message: 'Invalid credentials',
      statusCode: 401,
      error: 'Unauthorized',
    };

    const axiosError = new AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 401,
        statusText: 'Unauthorized',
        data: apiError,
        headers: {},
        config: {} as never,
      }
    );

    const message = getErrorMessage(axiosError);
    expect(message).toBe('Invalid credentials');
  });

  it('should use axios error message when response data is missing', () => {
    const axiosError = new AxiosError(
      'Network Error',
      'ERR_NETWORK',
      undefined,
      undefined,
      undefined
    );

    const message = getErrorMessage(axiosError);
    expect(message).toBe('Network Error');
  });

  it('should handle generic Error objects', () => {
    const error = new Error('Something went wrong');

    const message = getErrorMessage(error);
    expect(message).toBe('Something went wrong');
  });

  it('should handle unknown error types', () => {
    const error = { unknown: 'error' };

    const message = getErrorMessage(error);
    expect(message).toBe('An unexpected error occurred');
  });

  it('should handle null/undefined errors', () => {
    expect(getErrorMessage(null)).toBe('An unexpected error occurred');
    expect(getErrorMessage(undefined)).toBe('An unexpected error occurred');
  });

  it('should handle string errors', () => {
    const message = getErrorMessage('Simple error string');
    expect(message).toBe('An unexpected error occurred');
  });

  it('should prioritize response data message over error message', () => {
    const apiError: ApiError = {
      message: 'Detailed API error',
      statusCode: 400,
    };

    const axiosError = new AxiosError(
      'Generic error',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        status: 400,
        statusText: 'Bad Request',
        data: apiError,
        headers: {},
        config: {} as never,
      }
    );

    const message = getErrorMessage(axiosError);
    expect(message).toBe('Detailed API error');
  });

  it('should handle axios error without status code', () => {
    const axiosError = new AxiosError(
      'Request timeout',
      'ECONNABORTED',
      undefined,
      undefined,
      undefined
    );

    const message = getErrorMessage(axiosError);
    expect(message).toBe('Request timeout');
  });
});
