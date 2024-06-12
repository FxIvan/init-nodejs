const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const { Spot } = require("@binance/connector");

const client = new Spot(process.env.BINANCE_API_KEY);

const getAllCrypto = asyncHandler(async (req, res, next) => {
  try {
    const allPairs = await client.marginAllPairs();

    const allSymbols = [];
    allPairs.data.forEach((pair) => {
      allSymbols.push(pair.symbol);
    });

    res.status(200).json({ success: true, data: allSymbols });
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = {
  getAllCrypto,
};
