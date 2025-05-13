const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const loginRoutes = require('./routes/login');
const agendamentoRoutes = require('./routes/agendamentos');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica_fisio',
  password: 'sua_senha',
  port: 5432
});

// Deixa o banco disponível nas rotas
app.locals.db = db;

// Usa as rotas
app.use('/api', loginRoutes);
app.use('/api', agendamentoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
