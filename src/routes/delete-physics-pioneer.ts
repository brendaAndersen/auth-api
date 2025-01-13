import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { z } from "zod";

export function deletePhysicsPioneer(app: FastifyInstance) {
  const deleteSchema = z.object({
    id: z.string(),
  });

  app.delete("/delete-physics-pioneer/:id", async (request, response) => {
    try {
      const { id } = deleteSchema.parse(request.params);

      const deletedRecord = await prisma.physicsPioneer.delete({
        where: { id },
      });

      return response.status(200).send({
        message: "Registro apagado com sucesso",
        data: deletedRecord,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).send({
        message: "Erro ao apagar registro",
        error,
      });
    }
  });
}
