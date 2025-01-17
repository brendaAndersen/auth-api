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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = require("bcryptjs");
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, bcryptjs_1.hash)(password, 10);
    });
}
// função que verifica se a senha está correta
function verifyPassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, bcryptjs_1.compare)(password, hash);
        }
        catch (error) {
            console.error("Error comparing password:", error);
            return false;
        }
    });
}
//# sourceMappingURL=hash.js.map