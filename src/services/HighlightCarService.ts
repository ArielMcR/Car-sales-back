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
                    i.img_base64,
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