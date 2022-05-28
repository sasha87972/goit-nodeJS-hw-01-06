const express = require("express");
const router = express.Router();
const { contactsControls: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, auth } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  ctrl.updateStatus
);

module.exports = router;
