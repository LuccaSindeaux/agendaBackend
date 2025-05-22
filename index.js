require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

// Cria a aplicação express (sempre primeiro)
const app = express();

// Configura middlewares globais antes das rotas
app.use(cors());
app.use(bodyParser.json());

// Configura conexão com banco
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clinica_fisio',
  password: 'sua_senha',
  port: 5432
});

// Disponibiliza o db para as rotas via app.locals
app.locals.db = db;


const loginRoutes = require('./routes/login');
const horariosRouter = require('./routes/horarios');
const agendamentoRouter = require('./routes/agendamento');


app.use('/login', loginRoutes);
app.use('/horarios', horariosRouter);
app.use('/agendamento', agendamentoRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
