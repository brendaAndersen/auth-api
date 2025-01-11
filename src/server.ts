import fastify from "fastify";
import { createPhysicsPioneer } from "./routes/create-physics-pioneer";
import fastifyJwt from "fastify-jwt";

const app = fastify();

app.register(createPhysicsPioneer);
app.register(fastifyJwt, {
    secret: 'passwordSecret'
});

app.listen({
    port: 3333
}).then(() => console.log("Server is running! 🚀"))
