const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const { Spot } = require("@binance/connector");

class Portfolio {
  constructor() {
    this.assets = [];
    this.deposit = [];
    this.withdraw = [];
    this.operationSell = [];
    this.operationBuy = [];
    this.API_KEY = process.env.BINANCE_API_KEY;
    this.API_SECRET = process.env.BINANCE_SECRET_KEY;

    this.client = new Spot(this.API_KEY, this.API_SECRET);
  }

  async setAsset() {
    try {
      const res = await this.client.userAsset();
      this.assets.push(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async setDeposit() {
    try {
      const res = await this.client.depositHistory({
        coin: "",
        status: 1,
      });
      this.deposit.push(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async setWithdraw() {
    try {
      const res = await this.client.withdrawHistory({
        coin: "",
        status: 6,
      });
      this.withdraw.push(res.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  build() {
    return {
      assets: this.assets,
      deposit: this.deposit,
      withdraw: this.withdraw,
      operationSell: this.operationSell,
      operationBuy: this.operationBuy,
    };
  }
}

const getPortfolioBinance = asyncHandler(async (req, res) => {
  try {
    const portfolio = new Portfolio();
    await portfolio.setAsset();
    await portfolio.setDeposit();
    const { assets, deposit, withdraw } = portfolio.build();

    res.status(200).json({
      success: true,
      data: {
        assets,
        deposit,
        withdraw,
      },
    });
  } catch (error) {
    throw Boom.badImplementation(error);
  }
});

module.exports = {
  getPortfolioBinance,
};
