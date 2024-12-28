import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(1, 'Name cannot be empty'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters long'),
    role: z
      .enum(['admin', 'user'], {
        required_error: 'Role is required',
      })
      .optional()
      .default('user'),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
