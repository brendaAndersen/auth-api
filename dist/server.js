"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const create_physics_pioneer_1 = require("./routes/create-physics-pioneer");
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const app = (0, fastify_1.default)();
app.register(create_physics_pioneer_1.createPhysicsPioneer);
app.register(fastify_jwt_1.default, {
    secret: 'passwordSecret'
});
app.listen({
    port: 3333
}).then(() => console.log("Server is running! 🚀"));