import db from '../database/db'

class SearchInfoService {
    async execute() {
        try {
            const queries = {
                mark: "SELECT id_mark AS id, name FROM mark",
                models: "SELECT mo.id_model AS id, mo.name, m.name as mark FROM models mo INNER JOIN mark m ON mo.mark_id = m.id_mark",
                colors: "SELECT id_color AS id, name FROM colors",
                motors: "SELECT id_motors AS id,name FROM motors",
                traction: "SELECT id_traction AS id,name FROM traction",
                bodywork: "SELECT id_bodywork AS id,name FROM bodywork",
                fuel: "SELECT id_fuel AS id, name FROM fuel",
                transmition: "SELECT id_transmition AS id,name FROM transmition",
                direction: "SELECT id_direction AS id,name FROM direction",
            };

            const results = await Promise.all(
                Object.entries(queries).map(async ([key, query]) => {
                    const result = await db.query(query);
                    return [key, result.rows];
                })
            );
            const data = Object.fromEntries(results);
            return data;
        } catch (err) {
            console.error("Erro ao buscar informações:", err);
            return { ok: false, error: err };
        }
    }
}

export { SearchInfoService }
