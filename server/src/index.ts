require('./v1/db/connect');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/v1', require('./v1/routes/auth'));

app.listen(PORT, () => {
  console.log('ローカルサーバー起動中...');
});
