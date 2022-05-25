const express = require("express");
const router = express.Router();
const contactControls = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiSchema, statusJoiSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(contactControls.listContacts));

router.get("/:contactId", ctrlWrapper(contactControls.getById));

router.post(
  "/",
  validation(joiSchema),
  ctrlWrapper(contactControls.addContact)
);

router.delete("/:contactId", ctrlWrapper(contactControls.removeContact));

router.put(
  "/:contactId",
  validation(joiSchema),
  ctrlWrapper(contactControls.updateContact)
);
router.patch(
  "/:contactId/favorite",
  validation(statusJoiSchema),
  contactControls.updateStatus
);

module.exports = router;
