import db from '../database/db'

class SearchInfoService {
    async execute() {
        try {
            const queries = {
                mark: "SELECT * FROM mark",
                colors: "SELECT * FROM colors",
                motors: "SELECT * FROM motors",
                traction: "SELECT * FROM traction",
                bodywork: "SELECT * FROM bodywork",
                fuel: "SELECT * FROM fuel",
                transmition: "SELECT * FROM transmition",
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
