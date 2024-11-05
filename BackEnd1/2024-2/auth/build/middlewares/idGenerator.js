"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
const uuid_1 = require("uuid");
function generateId() {
    return (0, uuid_1.v7)();
}
