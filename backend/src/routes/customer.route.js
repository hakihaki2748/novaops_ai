import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";

// router.get("/", customerController);
router.post("/", customerController.createCustomer);


export default router;