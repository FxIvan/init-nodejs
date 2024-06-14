const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { User } = require("./models");
const { exchangeRoutes, cryptoRoutes } = require("./routes");

dotenv.config();
const app = express();
const server = require("http").Server(app);

app.disable("x-powered-by");

//CORS
const corsOptions = {
  origin: [
    process.env.LOCAL_URL,
    process.env.DEV_URL,
    process.env.PRODUCTION_URL,
  ],
  optionsSuccessStatus: 204,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//DB
/*connectDB(
  "mongodb+srv://" +
    process.env.MONGO_USER +
    ":" +
    encodeURIComponent(process.env.MONGO_PSW) +
    "@" +
    process.env.MONGO_URI
);*/
//Conectando mongodb desde localhost
//connectDB("mongodb://localhost:27017/");

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;

app.use(function (req, res, next) {
  console.log("METHOD:", req.method, "QUERY:", req.originalUrl);
  next();
});

app.use(function (req, res, next) {
  req.endpoint = req.originalUrl.split("/")[2];
  req.method = req.method;
  switch (req.endpoint) {
    case "users":
      req.Model = User;
      break;
  }

  next();
});

//Routes
app.get("/", (req, res) => {
  res.send("Api running....");
});

app.use("/api/exchange", exchangeRoutes);
app.use("/api/crypto", cryptoRoutes);

//Listen
server.listen(PORT, () =>
  console.log("Server started on port " + PORT, "in " + ENV + " mode")
);
