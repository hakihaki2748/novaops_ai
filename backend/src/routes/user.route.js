import express from "express";

const router = express.Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import userController from "../controllers/user.controller.js";
import validate from "../validations/validate.js"
import updateStatusSchema from "../validations/schemas/userUpdateStatus.schema.js"
import updateRoleSchema from "../validations/schemas/userUpdateRole.schema.js"
import createUserSchema from "../validations/schemas/createUser.schema.js"

router.get("/", authMiddleware, roleMiddleware("owner", "manager", "admin", "user"), userController.getUsers);
router.get("/:id", authMiddleware, roleMiddleware("owner", "manager", "admin", "user"), userController.findUserById);
router.post("/", authMiddleware, roleMiddleware("owner", "admin"),validate(createUserSchema), userController.createUser);
router.patch("/:id/status",authMiddleware, roleMiddleware("owner", "admin"), validate(updateStatusSchema), userController.updateStatus);
router.patch("/:id/role",authMiddleware, roleMiddleware("owner", "admin"), validate(updateRoleSchema), userController.updateRole);
router.delete("/:id", authMiddleware, roleMiddleware("owner", "admin"), userController.softDelete);


export default router;