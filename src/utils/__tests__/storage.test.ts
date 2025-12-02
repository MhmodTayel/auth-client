import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '../storage';
import type { User } from '@/types/auth.types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('storage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  describe('token management', () => {
    it('should store and retrieve token', () => {
      const token = 'test-jwt-token-123';
      storage.setToken(token);

      const retrieved = storage.getToken();
      expect(retrieved).toBe(token);
    });

    it('should return null when no token exists', () => {
      const token = storage.getToken();
      expect(token).toBeNull();
    });

    it('should remove token', () => {
      const token = 'test-jwt-token-123';
      storage.setToken(token);
      storage.removeToken();

      const retrieved = storage.getToken();
      expect(retrieved).toBeNull();
    });

    it('should overwrite existing token', () => {
      storage.setToken('old-token');
      storage.setToken('new-token');

      const retrieved = storage.getToken();
      expect(retrieved).toBe('new-token');
    });
  });

  describe('user management', () => {
    const mockUser: User = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      createdAt: '2024-01-01T00:00:00.000Z',
    };

    it('should store and retrieve user', () => {
      storage.setUser(mockUser);

      const retrieved = storage.getUser();
      expect(retrieved).toEqual(mockUser);
    });

    it('should return null when no user exists', () => {
      const user = storage.getUser();
      expect(user).toBeNull();
    });

    it('should remove user', () => {
      storage.setUser(mockUser);
      storage.removeUser();

      const retrieved = storage.getUser();
      expect(retrieved).toBeNull();
    });

    it('should handle user without createdAt', () => {
      const userWithoutDate: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      storage.setUser(userWithoutDate);
      const retrieved = storage.getUser();

      expect(retrieved).toEqual(userWithoutDate);
    });

    it('should serialize user object correctly', () => {
      storage.setUser(mockUser);

      const rawValue = localStorageMock.getItem('auth_user');
      expect(rawValue).toBe(JSON.stringify(mockUser));
    });

    it('should handle corrupted user data gracefully', () => {
      localStorageMock.setItem('auth_user', 'invalid-json');

      expect(() => storage.getUser()).toThrow();
    });
  });

  describe('clear', () => {
    it('should clear both token and user', () => {
      const token = 'test-token';
      const mockUser: User = {
        id: '123',
        email: 'test@example.com',
        name: 'Test User',
      };

      storage.setToken(token);
      storage.setUser(mockUser);

      storage.clear();

      expect(storage.getToken()).toBeNull();
      expect(storage.getUser()).toBeNull();
    });

    it('should not affect other localStorage items', () => {
      localStorageMock.setItem('other_key', 'other_value');
      storage.setToken('test-token');

      storage.clear();

      expect(localStorageMock.getItem('other_key')).toBe('other_value');
    });
  });

  describe('edge cases', () => {
    it('should handle very long tokens', () => {
      const longToken = 'a'.repeat(10000);
      storage.setToken(longToken);

      const retrieved = storage.getToken();
      expect(retrieved).toBe(longToken);
    });

    it('should handle user with special characters', () => {
      const userWithSpecialChars: User = {
        id: '123',
        email: 'test+tag@example.com',
        name: "O'Brien-Smith",
      };

      storage.setUser(userWithSpecialChars);
      const retrieved = storage.getUser();

      expect(retrieved).toEqual(userWithSpecialChars);
    });
  });
});
