import { z } from 'zod';

export const authSchema = {
  loginSchema: z.object({
    email: z.string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required')
      .max(255, 'Email is too long'),
    password: z.string()
      .min(6, 'Password must be at least 6 characters long')
      .max(100, 'Password is too long'),
    rememberMe: z.boolean().optional().default(false)
  }),

  refreshSchema: z.object({
    refreshToken: z.string().optional()
  }),

  forgotPasswordSchema: z.object({
    email: z.string()
      .email('Please enter a valid email address')
      .min(1, 'Email is required')
  }),

  resetPasswordSchema: z.object({
    token: z.string().min(1, 'Reset token is required'),
    password: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  }),

  changePasswordSchema: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string()
      .min(8, 'Password must be at least 8 characters long')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
    confirmPassword: z.string()
  }).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
  })
};