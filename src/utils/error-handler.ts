import { logger } from './logger';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): string => {
  if (error instanceof AppError) {
    logger.error('Application Error', {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    });
    return error.message;
  }

  if (error instanceof Error) {
    logger.error('Generic Error', error.message);
    return error.message;
  }

  logger.error('Unknown Error', error);
  return 'An unexpected error occurred';
};

export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    return (
      error.message.includes('Network') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('timeout')
    );
  }
  return false;
};
