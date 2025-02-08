import { FastifyReply, FastifyRequest } from "fastify";
import { AllCarService } from "../services/AllCarService";

class AllCarController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        try {
            const allCarService = new AllCarService();
            const allCar = await allCarService.execute();
            return response.send(allCar);
        } catch (error) {
            return response.status(500).send({ ok: false, error: `Erro ao buscar informações ${JSON.stringify(error)}` });
        }
    }
}



export { AllCarController }