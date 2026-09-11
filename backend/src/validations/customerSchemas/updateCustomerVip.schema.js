import { z } from "zod";

const updateCustomerVipSchema = z.object({
    isVip: z.boolean()
}).strict();

export default updateCustomerVipSchema;