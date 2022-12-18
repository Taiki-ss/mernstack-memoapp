import Express, { Request, Response } from 'express';
import { body } from 'express-validator';
import dotenv from 'dotenv';
import User from '../models/user';
import validation from '../middleware/validation';
import userController from '../controllers/user';
import tokenHandler from '../middleware/tokenHandler';

dotenv.config();

const router = Express.Router();

router.post(
  '/register',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります。'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります。'),
  body('confirmpassword')
    .isLength({ min: 8 })
    .withMessage('確認用パスワードは8文字以上である必要があります。'),
  body('username').custom((value: string) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject('このユーザーはすでに使われています。');
      }
    });
  }),
  validation,
  userController.register
);

// ログイン用API
router.post(
  '/login',
  body('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります。'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります。'),
  validation,
  userController.login
);

// JWT認証API
router.post(
  '/verify-token',
  tokenHandler.verifyToken,
  (req: Request, res: Response) => {
    return res.status(200).json({ user: req.user });
  }
);

module.exports = router;
