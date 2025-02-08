import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { FastifyZodInstance } from "../utils/types"
import z from 'zod'
import { SearchInfoController } from "../controllers/SearchInfoController"
export default function routes(app: FastifyZodInstance, opts: any, done: any) {
    app.get('/', {
        schema: {
            tags: ['root'],
            description: 'Welcome to the API',
            response: {
                200: z.object({
                    hello: z.string()
                }).describe('Hello World')
            }
        }
    }, () => {
        return { hello: 'world' }
    })
    app.get('/buscar_informacoes_iniciais', {
        schema: {
            tags: ['informações'],
            description: 'Buscar informações iniciais da aplicação',
            200: z.object({
                mark: z.array(
                    z.object({
                        id_mark: z.number(),
                        name: z.string()
                    })
                ).describe('Marcas disponíveis'),
                colors: z.array(
                    z.object({
                        id_color: z.number(),
                        name: z.string()
                    })
                ).describe('Cores disponíveis'),
                motors: z.array(
                    z.object({
                        id_motor: z.number(),
                        name: z.string()
                    })
                ).describe('Motores disponíveis'),
                traction: z.array(
                    z.object({
                        id_traction: z.number(),
                        name: z.string()
                    })
                ).describe('Trações disponíveis'),
                bodywork: z.array(
                    z.object({
                        id_bodywork: z.number(),
                        name: z.string()
                    })
                ).describe('Carrocerias disponíveis'),
                fuel: z.array(
                    z.object({
                        id_fuel: z.number(),
                        name: z.string()
                    })
                ).describe('Combustíveis disponíveis'),
                transmition: z.array(
                    z.object({
                        id_transmition: z.number(),
                        name: z.string()
                    })
                ).describe('Transmissões disponíveis'),
            }).describe('Buscar informações iniciais da aplicação'),
            500: z.object({
                ok: z.boolean(),
                error: z.string()
            }).describe('Erro ao buscar informações')
        }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        return new SearchInfoController().handle(request, reply)
    })
    done()
}