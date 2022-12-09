const express = require("express");
const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const User = require("./src/v1/models/user");
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

app.post("register", async (req, res) => {
  const password = req.body.password;

  try {
    // パスワードの暗号化
    req.body.password = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザー新規作成
    const user = await User.create(req.body);
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
