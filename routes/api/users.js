const express = require("express");

const router = express.Router();

const { users: ctrl } = require("../../controllers");
const { ctrlWrapper, auth } = require("../../middlewares");

router.get("/current", ctrlWrapper(auth), ctrlWrapper(ctrl.getCurrent));

module.exports = router;
