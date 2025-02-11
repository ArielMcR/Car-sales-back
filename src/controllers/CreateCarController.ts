import { FastifyReply, FastifyRequest } from "fastify";

import { CreateCarService } from "../services/CreatedCarService.js";

class CreateCarController {
    async handle(res: FastifyRequest, reply: FastifyReply) {
        const createCarService = new CreateCarService();
        const result = await createCarService.execute(res, reply);
        reply.send(result);
    }
}

export { CreateCarController }