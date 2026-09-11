import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";
import validate from "../validations/validate.js"
import createCustomerSchema from "../validations/customerSchemas/createCustomer.schema.js"
import updateCustomerSchema from "../validations/customerSchemas/updateCustomer.schema.js"
import updateCustomerVipSchema from "../validations/customerSchemas/updateCustomerVip.schema.js"
import updateCustomerSegmentSchema from "../validations/customerSchemas/updateCustomerSegment.schema.js"
import updateCustomerStatusSchema from "../validations/customerSchemas/updateCustomerStatus.schema.js"



router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.post("/", validate(createCustomerSchema), customerController.createCustomer);
router.patch("/:id",validate(updateCustomerSchema), customerController.updateCustomer);
router.patch("/:id/vip", validate(updateCustomerVipSchema), customerController.updateCustomerVip);
router.patch("/:id/segment", validate(updateCustomerSegmentSchema), customerController.updateCustomerSegment)
router.patch("/:id/status", validate(updateCustomerStatusSchema), customerController.updateCustomerStatus)
router.delete("/:id", customerController.deleteCustomer);

export default router;