import fastify from "fastify";
import { createPhysicsPioneer } from "./routes/create-physics-pioneer";
import fastifyJwt from "fastify-jwt";
import { login } from "./routes/login";
import { deletePhysicsPioneer } from "./routes/delete-physics-pioneer";

const app = fastify();

app.register(createPhysicsPioneer);
app.register(login);
app.register(deletePhysicsPioneer);

app.register(fastifyJwt, {
    secret: 'passwordSecret'
});

app.listen({
    port: 3333
}).then(() => console.log("Server is running! 🚀"))
