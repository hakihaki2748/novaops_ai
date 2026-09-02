import { z } from "zod";

const createCustomerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, "name minimal 3 karakter")
    .max(100, "name maksimal 100 karakter"),

    email: z
    .string()
    .trim()
    .email("email tidak valid"),

    phone: z
    .string()
    .trim()
    .min(10, "nomer telepon minimal 10 karakter")
    .max(20, "nomer telepon maksimal 20 karakter")
    .regex(/^[0-9+]+$/, "nomer telepon tidak valid")
}).strict();

export default createCustomerSchema;