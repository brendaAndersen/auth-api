"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = require("bcryptjs");
async function hashPassword(password) {
    return (0, bcryptjs_1.hash)(password, 10);
}
// função que verifica se a senha está correta
async function verifyPassword(password, hash) {
    return (0, bcryptjs_1.compare)(password, hash);
}
