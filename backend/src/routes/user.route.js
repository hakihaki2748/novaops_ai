import express from "express";

const router = express.Router();

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";
import userController from "../controllers/user.controller.js";
import validate from "../validations/validate.js"
import updateStatusSchema from "../validations/schemas/userUpdateStatus.schema.js"
import updateRoleSchema from "../validations/schemas/userUpdateRole.schema.js"


router.get("/", authMiddleware, roleMiddleware("owner", "manager", "admin"), userController.getUsers);
router.get("/:id", authMiddleware, roleMiddleware("owner", "manager", "admin", "user"), userController.findUserById);
router.post("/", authMiddleware, roleMiddleware("owner", "admin"), userController.createUser);
router.delete("/:id", authMiddleware, roleMiddleware("owner"), userController.softDelete);
router.patch("/:id/status",authMiddleware, roleMiddleware("owner", "manager"), validate(updateStatusSchema), userController.updateStatus);
router.patch("/:id/role",authMiddleware, roleMiddleware("owner", "manager", "admin"), validate(updateRoleSchema), userController.updateRole);


export default router;