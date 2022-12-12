const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}
