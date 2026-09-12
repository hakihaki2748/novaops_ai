// import library zod
import {z} from "zod";
import { CUSTOMER_SEGMENTS, CUSTOMER_STATUSES } from "../../utils/customers.constants.js";

//kita buat aturan variabel aturan schema untuk query parameter
const customerQuerySchema = z.object({
    search: z
        .string()
        .trim()
        .max(100, "search maksimal 100 karakter")
        .optional(),
    segment: z
        .enum(CUSTOMER_SEGMENTS)
        .optional(),
    status: z
        .enum(CUSTOMER_STATUSES)
        .optional(),
    is_vip: z
        .enum(["true", "false"])
        .optional(),
    sort: z
        .enum(["id", "name", "email", "created_at", "updated_at"])
        .default("created_at"),
    order: z
        .enum(["asc", "desc"])
        .default("desc"),
}).strict();

export default customerQuerySchema;