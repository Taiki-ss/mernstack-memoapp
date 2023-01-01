import Express, { Request, Response } from 'express';
import { body } from 'express-validator';

import MemoController from '../controllers/memo';
import tokenHandler from '../middleware/tokenHandler';

const router = Express.Router();

// メモを作成
router.post('/', tokenHandler.verifyToken, MemoController.create);

// ログインしているユーザが投稿したメモを全て取得
router.get('/', tokenHandler.verifyToken, MemoController.getAll);

router.get('/:memoId', tokenHandler.verifyToken, MemoController.getOne);

router.put('/:memoId', tokenHandler.verifyToken, MemoController.update);

module.exports = router;
