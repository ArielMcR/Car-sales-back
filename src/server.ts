import fastify from "fastify"
import { fastifyCors } from "@fastify/cors"
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import routes from "./routes/routes"
const PORT = Number(process.env.IO_PORT);

const app = fastify().withTypeProvider<ZodTypeProvider>()
app.register(fastifyCors, { origin: '*' })
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Documentation for Hendeny API ',
            version: '0.1.0'
        }
    },
    transform: jsonSchemaTransform,
})
app.register(fastifySwaggerUi, { routePrefix: '/docs', })
app.register(routes)
app.listen({ port: PORT }).then(() => {
    console.log(`Server ready at http://localhost:${PORT}`)
})
