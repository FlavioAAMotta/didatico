"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const baseURL_1 = require("./baseURL");
axios_1.default.get(`${baseURL_1.baseURL}/subscriber/idInvalido/notifications`)
    .then(res => console.log(res.data))
    .catch(error => { var _a; return ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message; }) //Null safety
    .then(console.log);
