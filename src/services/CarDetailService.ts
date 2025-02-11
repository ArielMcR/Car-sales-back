import db from "../database/db";

class CarDetailService {
    async execute(car_id: number) {
        try {
            const query = `
            SELECT
                c.id_car,
                m.name AS "model",
                co.name AS "color",
                d.name AS "direction",
                b.name AS "bodywork",
                f.name AS "fuel",
                t.name AS "traction",
                mo.name AS "motor",
                ma.name AS "mark",
                ta.name as "transmition",
                c.description,
                c.highlights,
                c.final_plate,
                c.trade,
                c.blindage,
                c.price,
                c.year,
                c.kilometers,
                ARRAY_AGG(i.img_base64) AS images,
                ARRAY_AGG(i.base_url) AS images_url
            FROM car c
                INNER JOIN models m
                ON c.model_id = m.id_model
                INNER JOIN colors co
                ON c.color_id = co.id_color
                INNER JOIN direction d
                ON c.direction_id = d.id_direction
                INNER JOIN bodywork b
                ON c.bodywork_id = b.id_bodywork
                INNER JOIN fuel f
                ON c.fuel_id = f.id_fuel
                INNER JOIN traction t
                ON c.traction_id = t.id_traction
                INNER JOIN motors mo
                ON c.motors_id = mo.id_motors
                INNER JOIN images i
                ON c.id_car = i.car_id
                INNER JOIN mark ma
                ON m.mark_id = ma.id_mark
                INNER JOIN transmition ta
                ON c.transmition_id = ta.id_transmition
                WHERE c.id_car = ${car_id} 
                GROUP BY c.id_car, m.name, b.name, t.name, co.name, d.name, f.name, mo.name, c.trade, c.blindage, c.price, c.year, c.kilometers, c.highlights, c.final_plate, ma.name, ta.name
            `
            const result = await db.query(query);
            return result.rows[0];
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            return { ok: false, error: error };
        }
    }
}

export { CarDetailService }