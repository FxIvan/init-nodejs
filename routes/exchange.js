const express = require("express");
const router = express.Router();

const {
  boomHandler,
  protect,
  admin,
  mitigate,
  joiValidation,
} = require("../middleware");
const { getPortfolioBinance } = require("../controllers");

router.route("/binance").get(getPortfolioBinance, boomHandler);

module.exports = router;
