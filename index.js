require("dotenv").config();
const port = process.env.PORT;

const db = require("/.database.js");

const express = require('express');
const app = express();

app.listen(port);

app.use(express.json());

//mostrar todos os clientes
app.get("/pacientes", async (req, res) =>{
  const pacientes = await db.selecionarPacientes;
  res.json(pacientes);
})

//Busca de um único cliente por nome
app.get("/paciente/:nome", async (req, res) =>{
  const paciente = await db.selecionarPaciente(req.params.nome);
  res.json(paciente);
})

//Inserção de pacientes
app.post("/pacientes", async (req, res) =>{
  await db.inserirPaciente(req.body);
  res.sendStatus(201);
})

//Faz o Update de pacientes 
app.patch("/pacientes/:id", async (req, res) =>{
  await db.atualizarPaciente(req.params.id, req.body);
  res.sendStatus(200);
})

const bodyParser = require('body-parser');
const cors = require('cors');

// Configura middlewares globais antes das rotas
app.use(cors());
app.use(bodyParser.json());

// Disponibiliza o db para as rotas via app.locals


const loginRoutes = require('./routes/login');
const horariosRouter = require('./routes/horarios');
const agendamentoRouter = require('./routes/agendamento');


app.use('/login', loginRoutes);
app.use('/horarios', horariosRouter);
app.use('/agendamento', agendamentoRouter);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
