import { z } from "zod";

const validateIdSchema = z.object({
    id: z
    .coerce.number()
    .int()
    .positive("ID harus lebih besar dari 0")
}).strict();

export default validateIdSchema;