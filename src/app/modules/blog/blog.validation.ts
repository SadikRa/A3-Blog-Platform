import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters long.' })
      .max(100, { message: 'Title cannot exceed 100 characters.' }),
    content: z
      .string()
      .min(20, { message: 'Content must be at least 20 characters long.' }),
    author: z
      .string()
      .regex(/^[a-f\d]{24}$/i, { message: 'Author must be a valid ObjectId.' }),
    isPublished: z.boolean().default(false),
  }),
});

const updateBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(5, { message: 'Title must be at least 5 characters long.' })
      .max(100, { message: 'Title cannot exceed 100 characters.' })
      .optional(), // Optional to allow partial updates
    content: z
      .string()
      .min(20, { message: 'Content must be at least 20 characters long.' })
      .optional(), // Optional to allow partial updates
  }),
});

export const BlogValidation = {
  blogValidationSchema,
  updateBlogValidationSchema,
};
