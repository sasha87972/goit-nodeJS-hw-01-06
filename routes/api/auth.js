const express = require("express");
const router = express.Router();
const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

router.post(
  "/register",
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
