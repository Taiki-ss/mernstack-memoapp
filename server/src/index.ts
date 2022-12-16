import dbConnect from './v1/db/connect';
import express from 'express';
const app = express();
const PORT = 3100;

dbConnect();

app.use(express.json());
app.use('/api/v1', require('./v1/routes/auth'));

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中...');
});
