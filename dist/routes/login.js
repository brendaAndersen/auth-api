"use strict";
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
    app.post('/login', async (request, response) => {
        const { email, password } = loginPhysicsPioneerSchema.parse(request.body);
        const physicsPioneer = await prisma_1.prisma.physicsPioneer.findUnique({
            where: { email: email }
        });
        if (!physicsPioneer) {
            return response.status(404).send({
                message: "This physics pioneer doesn't exists yet 🥲"
            });
        }
        const correctPass = await (0, hash_1.verifyPassword)(password, physicsPioneer.password);
        if (!correctPass) {
            return response.status(400).send({
                message: "Invalid password",
            });
        }
        const token = app.jwt.sign({
            id: physicsPioneer?.id, email: physicsPioneer?.email, name: physicsPioneer?.name
        });
        return response.status(201).send({
            token
        });
    });
}
