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
exports.login = login;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const hash_1 = require("../utils/hash");
function login(app) {
    const loginPhysicsPioneerSchema = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string()
    });
    app.post('/login', (request, response) => __awaiter(this, void 0, void 0, function* () {
        const { email, password } = loginPhysicsPioneerSchema.parse(request.body);
        const physicsPioneer = yield prisma_1.prisma.physicsPioneer.findUnique({
            where: { email: email }
        });
        if (!physicsPioneer) {
            return response.status(404).send({
                message: "This physics pioneer doesn't exists yet 🥲"
            });
        }
        const correctPass = yield (0, hash_1.verifyPassword)(password, physicsPioneer.password);
        if (!correctPass) {
            return response.status(400).send({
                message: "Invalid password",
            });
        }
        const token = app.jwt.sign({
            id: physicsPioneer === null || physicsPioneer === void 0 ? void 0 : physicsPioneer.id, email: physicsPioneer === null || physicsPioneer === void 0 ? void 0 : physicsPioneer.email, name: physicsPioneer === null || physicsPioneer === void 0 ? void 0 : physicsPioneer.name
        });
        return response.status(201).send({
            token
        });
    }));
}
//# sourceMappingURL=login.js.map