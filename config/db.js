const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit();
  }
};

module.exports = connectDB;
