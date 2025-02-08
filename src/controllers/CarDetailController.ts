import { FastifyReply, FastifyRequest } from "fastify";
import { CarDetailService } from "../services/CarDetailService";

class CarDetailController {
    async handle(req: FastifyRequest<{ Body: { car_id: number } }>, reply: FastifyReply) {
        try {
            const { car_id } = req.body;
            const carDetailService = new CarDetailService();
            const car = await carDetailService.execute(car_id);
            return reply.send(car);
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            return reply.send({ ok: false, error: error });
        }
    }
}

export { CarDetailController }