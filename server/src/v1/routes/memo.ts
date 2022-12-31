import Express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { create, getAll } from '../controllers/memo';
import tokenHandler from '../middleware/tokenHandler';

const router = Express.Router();

// メモを作成
router.post('/', tokenHandler.verifyToken, create);

// ログインしているユーザが投稿したメモを全て取得
router.get('/', tokenHandler.verifyToken, getAll);

module.exports = router;
