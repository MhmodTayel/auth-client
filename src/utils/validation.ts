import { z } from 'zod';
import { PASSWORD_REGEX, VALIDATION_MESSAGES } from './constants';

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  name: z
    .string()
    .min(1, VALIDATION_MESSAGES.NAME_REQUIRED)
    .min(3, VALIDATION_MESSAGES.NAME_MIN_LENGTH),
  password: z
    .string()
    .min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED)
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_PATTERN),
});

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.EMAIL_REQUIRED)
    .email(VALIDATION_MESSAGES.EMAIL_INVALID),
  password: z.string().min(1, VALIDATION_MESSAGES.PASSWORD_REQUIRED),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, VALIDATION_MESSAGES.PASSWORD_PATTERN),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z.object({
  name: z.string().min(3, VALIDATION_MESSAGES.NAME_MIN_LENGTH).optional(),
  email: z.string().email(VALIDATION_MESSAGES.EMAIL_INVALID).optional(),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
