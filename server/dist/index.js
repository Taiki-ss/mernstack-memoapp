"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connect_1 = __importDefault(require("./v1/db/connect"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var PORT = 3000;
(0, connect_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', require('./v1/routes/auth'));
app.listen(PORT, function () {
    console.log('ローカルサーバー起動中...');
});
