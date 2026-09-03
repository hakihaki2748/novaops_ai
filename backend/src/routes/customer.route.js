import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";
import validate from "../validations/validate.js"
import createCustomerSchema from "../validations/schemas/createCustomer.schema.js"
import updateCustomerSchema from "../validations/schemas/updateCustomer.schema.js"

router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", validate(createCustomerSchema), customerController.createCustomer);
router.patch("/:id",validate(updateCustomerSchema), customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

export default router;