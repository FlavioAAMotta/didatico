"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_1 = require("./data");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send("Olá Mundo");
});
function getUserById(id) {
    for (let i = 0; i < data_1.users.length; i++) {
        if (data_1.users[i].id === id) {
            return data_1.users[i];
        }
    }
    return null;
}
app.post('/users/:userId/playlists/:playlistId/tracks', (req, res) => {
    try {
        const userId = req.params.userId;
        const playlistId = req.params.playlistId;
        const { trackName, duration } = req.body;
        if (!trackName || !duration) {
            res.status(400);
            throw new Error("Campos vazios");
        }
        if (isNaN(duration) || duration <= 0) {
            res.status(422);
            throw new Error("Unprocessable Entity, invalid duration");
        }
        const user = getUserById(userId);
        if (!user) {
            res.status(404);
            throw new Error("Usuario não encontrado");
        }
        res.send(user);
    }
    catch (error) {
        res.send(error.message);
    }
});
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
