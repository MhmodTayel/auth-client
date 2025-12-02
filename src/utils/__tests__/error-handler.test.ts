import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AppError, handleError, isNetworkError } from '../error-handler';
import { logger } from '../logger';

// Mock the logger
vi.mock('../logger', () => ({
  logger: {
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));

describe('AppError', () => {
  it('should create an AppError with message', () => {
    const error = new AppError('Test error');

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Test error');
    expect(error.name).toBe('AppError');
  });

  it('should create an AppError with status code', () => {
    const error = new AppError('Not found', 404);

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not found');
  });

  it('should create an AppError with error code', () => {
    const error = new AppError('Validation error', 400, 'VALIDATION_ERROR');

    expect(error.statusCode).toBe(400);
    expect(error.code).toBe('VALIDATION_ERROR');
    expect(error.message).toBe('Validation error');
  });
});

describe('handleError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle AppError and return message', () => {
    const error = new AppError('Custom app error', 400, 'BAD_REQUEST');

    const message = handleError(error);

    expect(message).toBe('Custom app error');
    expect(logger.error).toHaveBeenCalledWith('Application Error', {
      message: 'Custom app error',
      statusCode: 400,
      code: 'BAD_REQUEST',
    });
  });

  it('should handle generic Error', () => {
    const error = new Error('Generic error');

    const message = handleError(error);

    expect(message).toBe('Generic error');
    expect(logger.error).toHaveBeenCalledWith('Generic Error', 'Generic error');
  });

  it('should handle unknown error types', () => {
    const error = { unknown: 'error' };

    const message = handleError(error);

    expect(message).toBe('An unexpected error occurred');
    expect(logger.error).toHaveBeenCalledWith('Unknown Error', error);
  });

  it('should handle null error', () => {
    const message = handleError(null);

    expect(message).toBe('An unexpected error occurred');
    expect(logger.error).toHaveBeenCalled();
  });

  it('should handle undefined error', () => {
    const message = handleError(undefined);

    expect(message).toBe('An unexpected error occurred');
    expect(logger.error).toHaveBeenCalled();
  });

  it('should log AppError with all available information', () => {
    const error = new AppError('Test error', 500, 'SERVER_ERROR');

    handleError(error);

    expect(logger.error).toHaveBeenCalledWith('Application Error', {
      message: 'Test error',
      statusCode: 500,
      code: 'SERVER_ERROR',
    });
  });
});

describe('isNetworkError', () => {
  it('should detect network errors by message', () => {
    const networkErrors = [
      new Error('Network Error'),
      new Error('Failed to fetch'),
      new Error('Request timeout'),
      new Error('Network request failed'),
    ];

    networkErrors.forEach((error) => {
      expect(isNetworkError(error)).toBe(true);
    });
  });

  it('should return false for non-network errors', () => {
    const nonNetworkErrors = [
      new Error('Validation error'),
      new Error('Authentication failed'),
      new Error('Resource not found'),
    ];

    nonNetworkErrors.forEach((error) => {
      expect(isNetworkError(error)).toBe(false);
    });
  });

  it('should return false for non-Error objects', () => {
    expect(isNetworkError(null)).toBe(false);
    expect(isNetworkError(undefined)).toBe(false);
    expect(isNetworkError('error string')).toBe(false);
    expect(isNetworkError({ message: 'Network Error' })).toBe(false);
  });

  it('should be case-sensitive', () => {
    expect(isNetworkError(new Error('Network Error'))).toBe(true);
    expect(isNetworkError(new Error('network error'))).toBe(false);
  });

  it('should detect timeout errors', () => {
    const timeoutError = new Error('Request timeout exceeded');
    expect(isNetworkError(timeoutError)).toBe(true);
  });

  it('should detect fetch failures', () => {
    const fetchError = new Error('Failed to fetch resource');
    expect(isNetworkError(fetchError)).toBe(true);
  });
});
