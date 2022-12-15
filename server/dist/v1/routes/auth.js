"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_validator_1 = require("express-validator");
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = __importDefault(require("../models/user"));
var validation_1 = __importDefault(require("../middleware/validation"));
var user_2 = __importDefault(require("../controllers/user"));
dotenv_1.default.config();
var router = express_1.default.Router();
router.post('/register', (0, express_validator_1.body)('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります。'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります。'), (0, express_validator_1.body)('confirmpassword')
    .isLength({ min: 8 })
    .withMessage('確認用パスワードは8文字以上である必要があります。'), (0, express_validator_1.body)('username').custom(function (value) {
    return user_1.default.findOne({ username: value }).then(function (user) {
        if (user) {
            return Promise.reject('このユーザーはすでに使われています。');
        }
    });
}), validation_1.default, user_2.default.register);
// ログイン用API
router.post('/login', (0, express_validator_1.body)('username')
    .isLength({ min: 8 })
    .withMessage('ユーザー名は8文字以上である必要があります。'), (0, express_validator_1.body)('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります。'), validation_1.default, user_2.default.login);
module.exports = router;
