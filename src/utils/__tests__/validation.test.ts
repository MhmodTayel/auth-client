import { describe, it, expect } from 'vitest';
import {
  signUpSchema,
  signInSchema,
  changePasswordSchema,
  updateProfileSchema,
} from '../validation';

describe('signUpSchema', () => {
  describe('valid inputs', () => {
    it('should accept valid signup data', () => {
      const validData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept minimum valid name length', () => {
      const validData = {
        email: 'test@example.com',
        name: 'Joe',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should accept password with all required characters', () => {
      const validData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'Abc123!@',
      };

      const result = signUpSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('email validation', () => {
    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        name: 'John Doe',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('email');
      }
    });

    it('should reject empty email', () => {
      const invalidData = {
        email: '',
        name: 'John Doe',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept valid email formats', () => {
      const emails = [
        'user@example.com',
        'test.user@example.co.uk',
        'user+tag@example.com',
        'user_name@example-domain.com',
      ];

      emails.forEach((email) => {
        const data = {
          email,
          name: 'John Doe',
          password: 'SecurePass123!',
        };
        const result = signUpSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });

  describe('name validation', () => {
    it('should reject name shorter than 3 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'Jo',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.path).toContain('name');
      }
    });

    it('should reject empty name', () => {
      const invalidData = {
        email: 'test@example.com',
        name: '',
        password: 'SecurePass123!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('password validation', () => {
    it('should reject password without letter', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: '12345678!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password without number', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'SecurePass!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password without special character', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'SecurePass123',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject password shorter than 8 characters', () => {
      const invalidData = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'Pass1!',
      };

      const result = signUpSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept all valid special characters', () => {
      // Based on PASSWORD_REGEX: @$!%*#?&
      const specialChars = ['@', '$', '!', '%', '*', '#', '?', '&'];

      specialChars.forEach((char) => {
        const data = {
          email: 'test@example.com',
          name: 'John Doe',
          password: `SecurePass123${char}`,
        };
        const result = signUpSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });
  });
});

describe('signInSchema', () => {
  it('should accept valid sign in data', () => {
    const validData = {
      email: 'test@example.com',
      password: 'anypassword',
    };

    const result = signInSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const invalidData = {
      email: 'invalid-email',
      password: 'anypassword',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject empty password', () => {
    const invalidData = {
      email: 'test@example.com',
      password: '',
    };

    const result = signInSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should not validate password strength on sign in', () => {
    const data = {
      email: 'test@example.com',
      password: 'weak',
    };

    const result = signInSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe('changePasswordSchema', () => {
  it('should accept valid password change data', () => {
    const validData = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123!',
      confirmPassword: 'NewPass123!',
    };

    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject when passwords do not match', () => {
    const invalidData = {
      currentPassword: 'OldPass123!',
      newPassword: 'NewPass123!',
      confirmPassword: 'DifferentPass123!',
    };

    const result = changePasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const error = result.error.issues.find((issue) =>
        issue.path.includes('confirmPassword')
      );
      expect(error?.message).toContain("don't match");
    }
  });

  it('should validate new password strength', () => {
    const invalidData = {
      currentPassword: 'OldPass123!',
      newPassword: 'weak',
      confirmPassword: 'weak',
    };

    const result = changePasswordSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});

describe('updateProfileSchema', () => {
  it('should accept valid profile update with name', () => {
    const validData = {
      name: 'Jane Doe',
    };

    const result = updateProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept valid profile update with email', () => {
    const validData = {
      email: 'newemail@example.com',
    };

    const result = updateProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should accept both name and email', () => {
    const validData = {
      name: 'Jane Doe',
      email: 'jane@example.com',
    };

    const result = updateProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject name shorter than 3 characters', () => {
    const invalidData = {
      name: 'Jo',
    };

    const result = updateProfileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      email: 'invalid-email',
    };

    const result = updateProfileSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should accept empty object', () => {
    const validData = {};

    const result = updateProfileSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });
});
