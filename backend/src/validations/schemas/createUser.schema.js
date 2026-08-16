import { z } from "zod";

export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name is too long"),
    
    phone: z
      .string()
      .trim()
      .min(10, "Phone number is too short")
      .max(20, "Phone number is too long")
      .regex(/^[0-9+]+$/, "Invalid phone number"),

    email: z
      .string()
      .trim()
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password is too long"),

    role: z.enum(["admin", "manager", "user"])

}).strict();