const express = require("express");
const router = express.Router();
const contactControls = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

router.get("/", ctrlWrapper(contactControls.listContacts));

router.get("/:contactId", ctrlWrapper(contactControls.getById));

router.post(
  "/",
  validation(contactSchema),
  ctrlWrapper(contactControls.addContact)
);

router.delete("/:contactId", ctrlWrapper(contactControls.removeContact));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(contactControls.updateContact)
);

module.exports = router;
