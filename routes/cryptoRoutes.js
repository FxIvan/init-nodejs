const express = require("express");
const router = express.Router();

const {
  boomHandler,
  protect,
  admin,
  mitigate,
  joiValidation,
} = require("../middleware");
const { getAllCrypto } = require("../controllers");

router.route("/all").get(getAllCrypto, boomHandler);

module.exports = router;
