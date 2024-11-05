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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("./connection");
const idGenerator_1 = require("./middlewares/idGenerator");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, nickname, email, password, role } = req.body;
        if (!name || !nickname || !password || !role || !email) {
            res.status(401);
            throw new Error("Favor enviar todos campos");
        }
        const newId = (0, idGenerator_1.generateId)();
        const user = yield (0, connection_1.connection)('to_do_list_users').where({ email });
        console.log(user);
        if (user.length > 0) {
            res.status(401);
            throw new Error("Email já cadastrado em nossa base");
        }
        yield (0, connection_1.connection)('to_do_list_users').insert({
            id: newId,
            name,
            nickname,
            password,
            role,
            email
        });
        res.send(newId);
    }
    catch (error) {
        res.send(error.sqlMessage || error.message);
    }
}));
const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
        const address = server.address();
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server.`);
    }
});
