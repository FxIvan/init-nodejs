const asyncHandler = require("express-async-handler");
const Boom = require("@hapi/boom");
const { Spot } = require("@binance/connector");

class Portfolio {
  constructor() {
    this.assets = [];
    this.deposit = [];
    this.withdraw = [];
    this.orders = [];
    this.history = [];
    this.API_KEY = process.env.BINANCE_API_KEY;
    this.API_SECRET = process.env.BINANCE_SECRET_KEY;

    this.client = new Spot(this.API_KEY, this.API_SECRET);
  }

  async setAsset() {
    try {
      const resTest = await this.client.marginPairIndex("ARSUSDT");
      console.log("resTest", resTest.data);

      const { data: AssetsUser } = await this.client.userAsset();

      const { data: allPairs } = await this.client.marginAllPairs();

      const USDTBasis = AssetsUser.map((asset) => `USDT${asset.asset}`);

      const USDTAgainstBasis = AssetsUser.map((asset) => `${asset.asset}USDT`);

      const availableSymbols = allPairs.map((pair) => pair.symbol);

      const symbols = availableSymbols.filter((symbol) => {
        return USDTBasis.includes(symbol) || USDTAgainstBasis.includes(symbol);
      });

      const marginAllInfo = await this.client.ticker24hr("", symbols);

      AssetsUser.forEach(async (asset) => {
        const symbol = `USDT${asset.asset}`;
        const symbolAgainst = `${asset.asset}USDT`;
        const symbolInfo = marginAllInfo.data.find(
          (info) => info.symbol === symbol || info.symbol === symbolAgainst
        );

        if (symbolInfo) {
          asset.price = symbolInfo.lastPrice;
          asset.totalUSDT = asset.price * asset.free;
        } else if (symbol !== "USDTUSDT") {
          const priceAssetInfo = await this.client.marginPairIndex(symbol);
          asset.price = priceAssetInfo.data.price;
          asset.totalUSDT = asset.free / asset.price;
        }
      });

      this.assets.push(AssetsUser);
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
      const endTime = new Date().getTime();
      for (let i = 12; i >= 1; i--) {
        const startTime = new Date(
          new Date().setMonth(new Date().getMonth() - i)
        ).getTime();
        const endTimeMonth = new Date(
          new Date().setMonth(new Date().getMonth() - (i - 1))
        ).getTime();

        const allOrders = await this.client.convertTradeHistory(
          startTime,
          endTimeMonth
        );

        for (let j = 0; j < allOrders.data.list.length; j++) {
          this.orders.push(allOrders.data.list[j]);
        }
      }
    } catch (error) {
      console.log("Error fetching all pairs:", error);
      throw error;
    }
  }

  async setHistory() {
    this.deposit[0].forEach((deposit) => {
      this.history.push({
        type: "deposit",
        idHistory: deposit.id,
        orderId: null,
        txId: deposit.txId,
        fromAmount: null,
        fromAsset: null,
        toAsset: deposit.coin,
        toAmount: deposit.amount,
        ratio: null,
        side: null,
        createdAt: new Date(deposit.insertTime).toISOString(),
        transactionFee: null,
      });
    });

    //Withdraw
    this.withdraw[0].forEach((withdraw) => {
      this.history.push({
        type: "withdraw",
        idHistory: withdraw.id,
        orderId: null,
        txId: withdraw.txId,
        fromAmount: withdraw.amount,
        fromAsset: withdraw.coin,
        toAsset: null,
        toAmount: null,
        ratio: null,
        side: null,
        createdAt: new Date(withdraw.applyTime).toISOString(),
        transactionFee: withdraw.transactionFee,
      });
    });

    //Orders
    this.orders.forEach((order) => {
      this.history.push({
        type: "order",
        idHistory: order.id || null,
        orderId: null,
        txId: order.txId,
        fromAmount: order.fromAmount,
        fromAsset: order.fromAsset,
        toAsset: order.toAsset,
        toAmount: order.toAmount,
        ratio: order.ratio,
        side: order.side,
        createdAt: new Date(order.createTime).toISOString(),
        transactionFee: null,
      });
    });

    this.history.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  }

  build() {
    return {
      assets: this.assets,
      deposit: this.deposit,
      withdraw: this.withdraw,
      orders: this.orders,
      history: this.history,
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
    await portfolio.setHistory();

    const { assets, deposit, withdraw, orders, history } = portfolio.build();
    res.status(200).json({
      success: true,
      data: {
        assets,
        deposit,
        withdraw,
        orders,
        history,
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
