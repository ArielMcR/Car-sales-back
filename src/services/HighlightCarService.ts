import db from "../database/db";
class HighlightCarService {
    async execute() {
        try {
            const query = `
            SELECT
                    c.id_car,
                    m.name AS "model",
                    b.name AS "bodywork",
                    t.name AS "traction",
                    ma.name AS "mark",
                    c.price,
                    c.year,
                    c.kilometers,
                    ARRAY_AGG(i.base_url) AS images_url,
                    c.highlights
                FROM car c
                    INNER JOIN models m
                    ON c.model_id = m.id_model
                    INNER JOIN mark ma
                    ON m.mark_id = ma.id_mark
                    INNER JOIN bodywork b
                    ON c.bodywork_id = b.id_bodywork
                    INNER JOIN traction t
                    ON c.traction_id = t.id_traction
                    INNER JOIN images i
                    ON c.id_car = i.car_id
                GROUP BY
                    c.id_car, m.name, b.name, t.name, ma.name,
                    c.price, c.year, c.kilometers, c.highlights
            `
            const result = await db.query(query);
            return result.rows;
        } catch (error) {
            console.error("Erro ao buscar informações:", error);
            return { ok: false, error: error };
        }
    }
}

export { HighlightCarService }