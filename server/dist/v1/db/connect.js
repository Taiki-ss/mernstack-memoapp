"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', false);
exports.default = (function () {
    // DB接続
    try {
        mongoose_1.default.connect(process.env.MONGODB_URL);
        console.log('DB接続中');
    }
    catch (error) {
        console.log(error);
    }
});
