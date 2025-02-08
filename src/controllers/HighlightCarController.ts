import { FastifyReply, FastifyRequest } from "fastify";
import { HighlightCarService } from "../services/HighlightCarService";


class HighlightCarController {
    async handle(request: FastifyRequest, response: FastifyReply) {
        const highlightCarService = new HighlightCarService();
        const highlightCar = await highlightCarService.execute();
        return response.send(highlightCar);
    }
}
export { HighlightCarController }