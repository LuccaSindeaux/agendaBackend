const { Pool } = require("pg");
require("dotenv").config(); // carrega variáveis do .env

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "senha_padrao",
  database: process.env.DB_NAME || "nome_do_banco",
  port: 5432,
  ssl: process.env.DB_HOST !== "localhost" ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => console.log("🟢 Conectado ao banco de dados com sucesso."))
  .catch((err) => console.error("🔴 Erro ao conectar ao banco:", err));

module.exports = pool;
