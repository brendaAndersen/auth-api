"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePhysicsPioneer = deletePhysicsPioneer;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
function deletePhysicsPioneer(app) {
    const deleteSchema = zod_1.z.object({
        id: zod_1.z.string(),
    });
    app.delete("/delete-physics-pioneer/:id", async (request, response) => {
        try {
            const { id } = deleteSchema.parse(request.params);
            const deletedRecord = await prisma_1.prisma.physicsPioneer.delete({
                where: { id },
            });
            return response.status(200).send({
                message: "Registro apagado com sucesso",
                data: deletedRecord,
            });
        }
        catch (error) {
            console.error(error);
            return response.status(500).send({
                message: "Erro ao apagar registro",
                error,
            });
        }
    });
}
