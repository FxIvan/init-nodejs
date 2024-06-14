const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const { Spot } = require("@binance/connector");

class Portfolio {
  constructor() {
    this.assets = [];
    this.deposit = [];
    this.withdraw = [];
    this.orders = [];
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

  async setOrders() {
    try {
      const oneMonthsAgo = new Date().setMonth(new Date().getMonth() - 1);
      const startTime = new Date(oneMonthsAgo).getTime();
      const endTime = new Date().getTime();

      const allOrders = await this.client.convertTradeHistory(
        startTime,
        endTime
      );

      for (let i = 0; i < allOrders.data.list.length; i++) {
        this.orders.push(allOrders.data.list[i]);
      }
    } catch (error) {
      console.log("Error fetching all pairs:", error);
      throw error;
    }
  }

  build() {
    return {
      assets: this.assets,
      deposit: this.deposit,
      withdraw: this.withdraw,
      orders: this.orders,
    };
  }
}

const getPortfolioBinance = asyncHandler(async (req, res) => {
  try {
    const portfolio = new Portfolio();
    await portfolio.setAsset();
    await portfolio.setDeposit();
    await portfolio.setWithdraw();
    await portfolio.setOrders();
    const { assets, deposit, withdraw, orders } = portfolio.build();
    res.status(200).json({
      success: true,
      data: {
        assets,
        deposit,
        withdraw,
        orders,
      },
    });
  } catch (error) {
    console.log("Error in getPortfolioBinance:", error);
    throw Boom.badImplementation(error);
  }
});

module.exports = {
  getPortfolioBinance,
};
