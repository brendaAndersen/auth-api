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
exports.createPhysicsPioneer = createPhysicsPioneer;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const hash_1 = require("../utils/hash");
const uuid_1 = require("uuid");
function createPhysicsPioneer(app) {
    const createPhysicsPioneerSchema = zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8, "Min 8 characters")
    });
    const id = (0, uuid_1.v4)();
    app.post("/create-physics-pioneer", (request, response) => __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = createPhysicsPioneerSchema.parse(request.body);
        const physicsPioneerFound = yield prisma_1.prisma.physicsPioneer.findUnique({
            where: { email }
        });
        if (physicsPioneerFound) {
            return response.status(400).send({ message: "This physics pioneer already exists! Try another one 😄" });
        }
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const physicsPioneer = yield prisma_1.prisma.physicsPioneer.create({
            data: {
                id, name, email, password: hashedPassword
            }
        });
        return response.status(200).send(physicsPioneer);
    }));
}
//# sourceMappingURL=create-physics-pioneer.js.map