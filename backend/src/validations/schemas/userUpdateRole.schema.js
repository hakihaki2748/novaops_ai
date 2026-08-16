import { z } from "zod";

const roleAction = z.object({
    role : z.enum(["owner", "manager", "admin"])
}).strict();

export default roleAction;