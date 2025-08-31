import { z } from 'zod';

export const loginSchema = z.object({
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
  password: z.string().min(1, 'Password is required'),
});

export const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),

    // ✅ role required, no default in schema
    role: z.enum(["user", "agent"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });







export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
