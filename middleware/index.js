const { boomHandler } = require("./errorMiddleware");
const { protect, admin, mitigate } = require("./authMiddleware");
const { joiValidation } = require("./joiMiddleware");

module.exports = {
  boomHandler,
  protect,
  admin,
  mitigate,
  joiValidation,
};
