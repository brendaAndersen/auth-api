import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export function createPhysicsPioneer(app: FastifyInstance){
    
    const createPhysicsPioneerSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(8, "Min 8 characters")
    })

    app.post("/create-physics-pioneer", async (request, response) => {
        const { name, email, password } = createPhysicsPioneerSchema.parse(request.body);
        
        const physicsPioneerFound = await prisma.physicsPioneer.findUnique({
            where: { email }
        });

        if(physicsPioneerFound){
            return response.status(400).send({ message: "This physics pioneer already exists! Try another one 😄" })
        }

        const physicsPioneer = await prisma.physicsPioneer.create({
            data: {
                name, email, password 
            }
        });

        return response.status(200).send(physicsPioneer);
    });
}