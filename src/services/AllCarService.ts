import db from "../database/db";
class AllCarService {
    async execute() {
        try {
            const query = `
            SELECT
                c.id_car,
                m.name AS "model",
                ma.name AS "mark",
                co.name AS "color",
                d.name AS "direction",
                b.name AS "bodywork",
                f.name AS "fuel",
                t.name AS "traction",
                mo.name AS "motor",
                c.trade,
                c.blindage,
                c.price,
                c.year,
                c.kilometers,
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
                GROUP BY
                    c.id_car, m.name, b.name, t.name, ma.name,
                    c.price, c.year, c.kilometers, c.highlights,
                    co.name,  d.name, f.name, mo.name, c.trade, c.blindage
                `
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            return { ok: false, error: error };
        }
    }
}


export { AllCarService }