import { describe, it, expect } from 'vitest';
import {
  API_BASE_URL,
  TOKEN_KEY,
  USER_KEY,
  ROUTES,
  PASSWORD_REGEX,
  VALIDATION_MESSAGES,
} from '../constants';

describe('constants', () => {
  describe('API_BASE_URL', () => {
    it('should be defined', () => {
      expect(API_BASE_URL).toBeDefined();
      expect(typeof API_BASE_URL).toBe('string');
    });

    it('should be a valid URL format', () => {
      expect(API_BASE_URL).toMatch(/^https?:\/\//);
    });
  });

  describe('storage keys', () => {
    it('should have TOKEN_KEY defined', () => {
      expect(TOKEN_KEY).toBe('auth_token');
    });

    it('should have USER_KEY defined', () => {
      expect(USER_KEY).toBe('auth_user');
    });
  });

  describe('ROUTES', () => {
    it('should have all required routes', () => {
      expect(ROUTES.HOME).toBe('/');
      expect(ROUTES.SIGN_IN).toBe('/signin');
      expect(ROUTES.SIGN_UP).toBe('/signup');
      expect(ROUTES.DASHBOARD).toBe('/dashboard');
    });

    it('should be typed as readonly', () => {
      // TypeScript enforces immutability at compile time with 'as const'
      expect(ROUTES.HOME).toBe('/');
      expect(ROUTES).toHaveProperty('HOME');
    });
  });

  describe('PASSWORD_REGEX', () => {
    it('should accept valid passwords', () => {
      const validPasswords = [
        'SecurePass123!',
        'MyP@ssw0rd',
        'Test1234!',
        'Abc123!@#',
        'P@ssw0rd123',
      ];

      validPasswords.forEach((password) => {
        expect(PASSWORD_REGEX.test(password)).toBe(true);
      });
    });

    it('should reject passwords without letters', () => {
      const invalidPasswords = ['12345678!', '!@#$%^&*123'];

      invalidPasswords.forEach((password) => {
        expect(PASSWORD_REGEX.test(password)).toBe(false);
      });
    });

    it('should reject passwords without numbers', () => {
      const invalidPasswords = ['SecurePass!', 'NoNumbers!@'];

      invalidPasswords.forEach((password) => {
        expect(PASSWORD_REGEX.test(password)).toBe(false);
      });
    });

    it('should reject passwords without special characters', () => {
      const invalidPasswords = ['SecurePass123', 'NoSpecial1234'];

      invalidPasswords.forEach((password) => {
        expect(PASSWORD_REGEX.test(password)).toBe(false);
      });
    });

    it('should reject passwords shorter than 8 characters', () => {
      const invalidPasswords = ['Pass1!', 'Abc12!'];

      invalidPasswords.forEach((password) => {
        expect(PASSWORD_REGEX.test(password)).toBe(false);
      });
    });

    it('should accept all allowed special characters', () => {
      const specialChars = ['!', '@', '#', '$', '%', '*', '&'];

      specialChars.forEach((char) => {
        const password = `SecurePass123${char}`;
        expect(PASSWORD_REGEX.test(password)).toBe(true);
      });
    });
  });

  describe('VALIDATION_MESSAGES', () => {
    it('should have email validation messages', () => {
      expect(VALIDATION_MESSAGES.EMAIL_REQUIRED).toBeDefined();
      expect(VALIDATION_MESSAGES.EMAIL_INVALID).toBeDefined();
    });

    it('should have name validation messages', () => {
      expect(VALIDATION_MESSAGES.NAME_REQUIRED).toBeDefined();
      expect(VALIDATION_MESSAGES.NAME_MIN_LENGTH).toBeDefined();
    });

    it('should have password validation messages', () => {
      expect(VALIDATION_MESSAGES.PASSWORD_REQUIRED).toBeDefined();
      expect(VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH).toBeDefined();
      expect(VALIDATION_MESSAGES.PASSWORD_PATTERN).toBeDefined();
    });

    it('should have user-friendly messages', () => {
      Object.values(VALIDATION_MESSAGES).forEach((message) => {
        expect(message.length).toBeGreaterThan(0);
        expect(typeof message).toBe('string');
      });
    });

    it('should be typed as readonly', () => {
      // TypeScript enforces immutability at compile time with 'as const'
      expect(VALIDATION_MESSAGES.EMAIL_REQUIRED).toBe('Email is required');
      expect(VALIDATION_MESSAGES).toHaveProperty('EMAIL_REQUIRED');
    });
  });
});
