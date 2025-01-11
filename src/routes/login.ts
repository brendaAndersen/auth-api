import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { verifyPassword } from "../utils/hash";

export function login (app: FastifyInstance){

    const loginPhysicsPioneerSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })

    app.post('/login', async (request, response) => {
        const { email, password } = loginPhysicsPioneerSchema.parse(request.body);

        const physicsPioneer = await prisma.physicsPioneer.findUnique({
            where: email
        });

        if(!physicsPioneer){
            return response.status(404).send({
                message: "This physics pioneer doesn't exists yet 🥲"
            })
        }
        const correctPass = await verifyPassword(password, physicsPioneer.password);

        if(!correctPass){
            return response.status(400).send({
                message: "Invalid password"
            });
        }
        const token = app.jwt.sign({
            id: physicsPioneer?.id, email: physicsPioneer?.email, name: physicsPioneer?.name
        })
        return response.status(201).send({
            token
        })
    })
}