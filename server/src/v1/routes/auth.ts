const router = require('express').Router();
const { body } = require('express-validator');
require('dotenv').config();

const User = require('../models/user');
const validation = require('../middleware/validation');
const userController = require('../controllers/user');

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
    return User.findOne({ username: value }).then((user: string) => {
      if (user) {
        return Promise.reject('このユーザーはすでに使われています。');
      }
    });
  }),
  validation.validate,
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
  validation.validate,
  userController.login
);

module.exports = router;
