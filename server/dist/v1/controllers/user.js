"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var user_1 = __importDefault(require("../models/user"));
// ユーザー新規登録用API
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var password, user, token, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                password = req.body.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                // パスワードの暗号化
                req.body.password = crypto_js_1.default.AES.encrypt(password, process.env.SECRET_KEY);
                return [4 /*yield*/, user_1.default.create(req.body)];
            case 2:
                user = _a.sent();
                token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: '24h',
                });
                return [2 /*return*/, res.status(200).json({ user: user, token: token })];
            case 3:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).json(error_1)];
            case 4: return [2 /*return*/];
        }
    });
}); };
// ユーザーログイン用API
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, user, decryptedPassword, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1.default.findOne({ username: username }).select('password username')];
            case 2:
                user = _b.sent();
                // DBからユーザーが存在するか探す
                if (!user) {
                    return [2 /*return*/, res.status(401).json({
                            errors: {
                                param: 'username',
                                message: 'ユーザー名が無効です',
                            },
                        })];
                }
                decryptedPassword = crypto_js_1.default.AES.decrypt(user.password, process.env.SECRET_KEY).toString(crypto_js_1.default.enc.Utf8);
                if (password !== decryptedPassword) {
                    return [2 /*return*/, res.status(401).json({
                            errors: {
                                param: 'password',
                                message: 'パスワードが無効です',
                            },
                        })];
                }
                token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
                    expiresIn: '24h',
                });
                return [2 /*return*/, res.status(201).json({ user: user, token: token })];
            case 3:
                error_2 = _b.sent();
                return [2 /*return*/, res.status(500).json({ error: error_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { register: register, login: login };
