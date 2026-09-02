import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", customerController.createCustomer);
router.patch("/:id", customerController.updateCustomer);
// router.delete("/:id", customerController.deleteCustomer);

export default router;