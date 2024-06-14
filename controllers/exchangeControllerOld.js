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
      const allPairs = await this.client.marginAllPairs();
      const arrayPars = [];
      //Longitud de  allPairs

      //////////////////////////////////////////////
      /*console.log(allPairs.data.length);
      await this.client
        .allOrders("DOGEUSDT", {
          orderId: 52,
        })
        .then((response) => {
          console.log(response.data);
          this.orders.push(response.data);
        });*/
      //////////////////////////////////////////////

      for (const pair of allPairs.data.slice(0, 30)) {
        console.log("Pair ---->", pair.symbol);
        /*const res = await this.client.allOrders("BNBUSDT", {
          //
          orderId: 52,
        });

        res.data.forEach((order) => {
          arrayPars.push(order); // Agrega cada orden individualmente al array
        });

        this.orders.push(...arrayPars);
        */
        //const res = await this.client.marginAllOrders(pair.symbol);

        //const res = await this.client.tradeFee({ symbol: pair.symbol });

        //console.log("Res ---->", res.data);
      }

      /*
      allPairs.data.slice(0, 30).forEach(async (pair) => {
        const res = await this.client.allOrders(pair.symbol, {
          orderId: 52,
        });

        //guardar los array insertado e insertar los nuevos
        res.data.forEach((order) => {
          console.log("Dentro de los pares ---->", order);
          arrayPars.push(...order, order);
        });
        //Assets Actuales
        //Depositos Actuales
        //Retiros Actuales
        //Traer todos los depositos y con eso podremos buscar las transaccion echo con eso
        //Ya que para comprar una crypto o cambiar se necesita una moneda base
      });

      this.orders.push(arrayPars);
      */

      const resMarginAll = await this.client.marginOrder("BNBUSDT", {
        origClientOrderId: "",
      });
      console.log("Margin All Assets ---->", resMarginAll.data);
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
    console.log("orders ---->", orders);
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
