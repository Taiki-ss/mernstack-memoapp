const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

mongoose.set("strictQuery", false);

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
