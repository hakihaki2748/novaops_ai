import { z } from "zod";

const roleAction = z.object({
    role : z.enum(["owner", "manager", "admin", "user"])
}).strict();

export default roleAction;