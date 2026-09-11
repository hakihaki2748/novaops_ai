import {z} from "zod";
import { CUSTOMER_SEGMENTS } from "../../utils/customers.constants.js";

const updateCustomerSegmentSchema = z.object({
    segment: z.enum(CUSTOMER_SEGMENTS)
}).strict();

export default updateCustomerSegmentSchema;