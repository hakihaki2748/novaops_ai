import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";
import validate from "../validations/validate.js"
import createCustomerSchema from "../validations/schemas/createCustomer.schema.js"


router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", validate(createCustomerSchema), customerController.createCustomer);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;