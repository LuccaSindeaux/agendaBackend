const pool = require("./config/database");

(async () => {
  try {
    const result = await pool.query("SELECT NOW() as now");
    console.log("🕒 Horário atual do banco:", result.rows[0].now);
  } catch (err) {
    console.error("Erro na consulta:", err);
  } finally {
    pool.end(); // Encerra a conexão
  }
})();
