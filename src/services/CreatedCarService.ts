import { FastifyReply, FastifyRequest } from "fastify";
import { cloudinary } from "../utils/cloudnary";
import db from "../database/db";

class CreateCarService {
    async execute(req: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await req.file();
            if (!data) {
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }
            const {
                model_id, year, color_id, motor_id, traction_id, bodywork_id, fuel_id,
                price, description, highlights, final_plate, trade, blindage,
                kilometers, condition, transmition
            } = req.body as {
                model_id: number;
                year: number;
                motor_id: number;
                color_id: number;
                traction_id: number;
                bodywork_id: number;
                fuel_id: number;
                price: number;
                description: string;
                highlights: boolean;
                final_plate: string;
                trade: boolean;
                blindage: boolean;
                kilometers: number;
                condition: string;
                transmition: number;
            };
            const queryCar = `
                INSERT INTO car 
                (model_id, year, color_id, motor_id, traction_id, bodywork_id, fuel_id, 
                price, description, highlights, final_plate, trade, blindage, kilometers, 
                condition, transmition) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            const [resultCar]: any = await db.query(queryCar, [
                model_id, year, color_id, motor_id, traction_id, bodywork_id, fuel_id,
                price, description, highlights, final_plate, trade, blindage,
                kilometers, condition, transmition
            ]);

            const carId = resultCar.insertId;

            if (!carId) {
                return reply.status(500).send({ error: "Erro ao inserir carro no banco" });
            }

            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'uploads' },
                    (error, result) => {
                        if (error || !result) reject(error);
                        else resolve(result as { secure_url: string });
                    }
                );

                data.file.pipe(uploadStream);
            });

            if (!uploadResult || !uploadResult.secure_url) {
                return reply.status(500).send({ error: "Erro no upload da imagem" });
            }

            const queryImage = `INSERT INTO car_image (car_id, base_url) VALUES (?, ?)`;
            await db.query(queryImage, [carId, uploadResult.secure_url]);

            return reply.send({
                message: "Carro cadastrado com sucesso!",
                car_id: carId,
                image_url: uploadResult.secure_url
            });

        } catch (error) {
            return reply.status(500).send({ error: "Erro no upload" });
        }
    }
}

export { CreateCarService };
