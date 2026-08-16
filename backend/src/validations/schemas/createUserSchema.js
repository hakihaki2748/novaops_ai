export const createUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(100, "Name is too long"),

    email: z
        .string()
        .trim()
        .email("Invalid email address"),

    status: z.enum([
        "active",
        "inactive",
        "suspended"
    ]),

    age: z
        .number()
        .int()
        .min(18)
        .max(100)
}).strict();