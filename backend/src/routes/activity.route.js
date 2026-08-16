import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import roleMiddleware from "../middlewares/role.middleware.js";

import activityController from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/:id/logs", authMiddleware, roleMiddleware("owner", "manager1", "manager2", "user"), activityController.getUserLogs);

export default router;