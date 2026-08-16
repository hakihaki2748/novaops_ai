import { z } from 'zod';

export const updateStatus = z.object({
    status: z.enum([
        "active", 
        "inactive",
        "suspended"
    ])
}).strict();

export default updateStatus;