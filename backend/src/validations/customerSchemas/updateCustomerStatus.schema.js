//impport dari zod
import { z } from "zod";
import { CUSTOMER_STATUSES } from "../../utils/customers.constants.js";

const updateCustomerStatusSchema = z.object({
    status: z.enum(CUSTOMER_STATUSES)
}).strict();

export default updateCustomerStatusSchema;