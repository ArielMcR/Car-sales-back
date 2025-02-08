import { FastifyReply, FastifyRequest } from "fastify";
import { SearchInfoService } from "../services/SearchInfoService";

class SearchInfoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const searchInfoService = new SearchInfoService();
            const searchInfo = await searchInfoService.execute();

            return res.send(searchInfo);
        } catch (error) {
            return res.status(500).send({ ok: false, error: `Erro ao buscar informações ${JSON.stringify(error)}` });
        }
    }
}

export { SearchInfoController }