"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhysicsPioneer = createPhysicsPioneer;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
function createPhysicsPioneer(app) {
    const createPhysicsPioneerSchema = zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8, "Min 8 characters")
    });
    app.post("/create-physics-pioneer", async (request, response) => {
        const { name, email, password } = createPhysicsPioneerSchema.parse(request.body);
        const physicsPioneerFound = await prisma_1.prisma.physicsPioneer.findUnique({
            where: { email }
        });
        if (physicsPioneerFound) {
            return response.status(400).send({ message: "This physics pioneer already exists! Try another one 😄" });
        }
        const physicsPioneer = await prisma_1.prisma.physicsPioneer.create({
            data: {
                name, email, password
            }
        });
        return response.status(200).send(physicsPioneer);
    });
}
