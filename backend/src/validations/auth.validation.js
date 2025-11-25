import { z } from "zod";

// schema untuk email
export const emailSchema = z
  .string()
  .trim()
  .email("Invalid email address")
  .min(1)
  .max(255);

// schema untuk password
export const passwordSchema = z.string().trim().min(4);

// schema untuk register
export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email: emailSchema,
  password: passwordSchema,
});

// schema untuk login
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
