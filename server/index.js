const express = require("express");
const mongoose = require("mongoose");
const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");
const User = require("./src/v1/models/user");
const app = express();
const PORT = 3000;
require("dotenv").config();

app.use(express.json());

mongoose.set("strictQuery", false);

// DB接続
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("DB接続中");
} catch (error) {
  console.log(error);
}

app.post("/register", async (req, res) => {
  const password = req.body.password;

  try {
    // パスワードの暗号化
    req.body.password = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY);
    // ユーザー新規作成
    const user = await User.create(req.body);
    // JWTの発行
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(PORT, () => {
  console.log("ローカルサーバー起動中...");
});
