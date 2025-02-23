import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import { FastifyZodInstance } from "../utils/types"
import z from 'zod'
import { SearchInfoController } from "../controllers/SearchInfoController"
import { HighlightCarController } from "../controllers/HighlightCarController"
import { AllCarController } from "../controllers/AllCarController"
import { CarDetailController } from "../controllers/CarDetailController"
import { CreateCarController } from "../controllers/CreateCarController"
export default function routes(app: FastifyZodInstance, opts: any, done: any) {

    app.get('/ping', {
        schema: {
            tags: ['Principal'],
            description: 'Teste de conexão com a API',
            200: z.object({
                message: z.string()
            }).describe('Retorna pong')
        }
    }, async () => {
        return { message: 'pong' }
    })
    app.get('/', {
        schema: {
            tags: ['Principal'],
            description: 'Welcome to the API',
        }
    }, async (res: FastifyRequest, reply: FastifyReply) => {
        return reply.sendFile('index.html');
    })
    app.get('/buscar_filtros', {
        schema: {
            tags: ['Informações'],
            description: 'Buscar informações iniciais da aplicação',
            200: z.object({
                mark: z.array(
                    z.object({
                        id_mark: z.number(),
                        name: z.string()
                    })
                ).describe('Marcas disponíveis'),
                models: z.array(
                    z.object({
                        id_model: z.number(),
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
    app.get('/buscar_carros_destaque', {
        schema: {
            tags: ['Carros'],
            description: 'Buscar carros em destaque',
            200: z.array(
                z.object({
                    id_car: z.number(),
                    model: z.string(),
                    bodywork: z.string(),
                    traction: z.string(),
                    mark: z.string(),
                    price: z.number(),
                    year: z.number(),
                    kilometers: z.number(),
                    img_base64: z.string(),
                    highlights: z.string()
                })
            ).describe('Carros em destaque'),
            500: z.object({
                ok: z.boolean(),
                error: z.string()
            }).describe('Erro ao buscar carros em destaque')
        }
    }, async (req: FastifyRequest, res: FastifyReply) => {
        return new HighlightCarController().handle(req, res)
    })
    app.get('/buscar_carros', {
        schema: {
            tags: ['Carros'],
            description: 'Buscar todos os carros',
            200: z.array(
                z.object({
                    id_car: z.number(),
                    model: z.string(),
                    color: z.string(),
                    direction: z.string(),
                    bodywork: z.string(),
                    fuel: z.string(),
                    traction: z.string(),
                    motor: z.string(),
                    description: z.string(),
                    highlights: z.string(),
                    final_plate: z.string(),
                    trade: z.string(),
                    blindage: z.string(),
                    price: z.number(),
                    year: z.number(),
                    kilometers: z.number(),
                    img_base64: z.string()
                })
            ).describe('Todos os carros'),
            500: z.object({
                ok: z.boolean(),
                error: z.string()
            }).describe('Erro ao buscar todos os carros')
        }
    }, async (req: FastifyRequest, res: FastifyReply) => {
        return new AllCarController().handle(req, res)
    })
    app.post('/buscar_carro', {
        schema: {
            tags: ['Carros'],
            description: 'Buscar informações de um carro',
            body: z.object({
                car_id: z.number()
            }),
            200: z.array(
                z.object({
                    id_car: z.number(),
                    model: z.string(),
                    color: z.string(),
                    direction: z.string(),
                    bodywork: z.string(),
                    fuel: z.string(),
                    traction: z.string(),
                    motor: z.string(),
                    description: z.string(),
                    highlights: z.string(),
                    final_plate: z.string(),
                    trade: z.string(),
                    blindage: z.string(),
                    price: z.number(),
                    year: z.number(),
                    kilometers: z.number(),
                    img_base64: z.string()
                })
            ).describe('Informações do carro'),
        }
    }, async (req: FastifyRequest<{ Body: { car_id: number } }>, res: FastifyReply) => {
        return new CarDetailController().handle(req, res)
    })



    //Rotas Painel administrativo 
    app.post('/create_car', {
        schema: {
            tags: ['Admin'],
            description: 'Cadastrar carro',
            body: z.object({
                model: z.string(),
                color: z.string(),
                direction: z.string(),
                bodywork: z.string(),
                fuel: z.string(),
                traction: z.string(),
                motor: z.string(),
                description: z.string(),
                highlights: z.string(),
                final_plate: z.string(),
                trade: z.string(),
                blindage: z.string(),
                price: z.number(),
                year: z.number(),
                kilometers: z.number(),
                img_base64: z.string()
            }),
            200: z.object({
                ok: z.boolean(),
                message: z.string()
            }).describe('Carro cadastrado com sucesso'),
            500: z.object({
                ok: z.boolean(),
                error: z.string()
            }).describe('Erro ao cadastrar carro')
        }
    }, async (req: FastifyRequest<{ Body: { model: string, color: string, direction: string, bodywork: string, fuel: string, traction: string, motor: string, description: string, highlights: string, final_plate: string, trade: string, blindage: string, price: number, year: number, kilometers: number, img_base64: string } }>, res: FastifyReply) => {
        return new CreateCarController().handle(req, res)
    })
    done()
}