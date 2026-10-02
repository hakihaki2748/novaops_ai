import { z } from 'zod';

const userSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Name wajib diisi.')
        .min(2, 'Name minimal 2 karakter.')
        .max(100),

    email: z.string()
        .trim()
        .email('Format email tidak valid.')
        .max(100),

    phone: z.string()
        .trim()
        .refine(
            value => !value || /^[0-9+\-\s()]+$/.test(value),
            'Format nomor telepon tidak valid.'
        ),

    password: z.string()
        .min(12, 'Password minimal 12 karakter.'),

    role: z.string(),

}).strict();

export { userSchema };
