async function connect(){
    if(global.connection){
        return global.connection.connect();
    }
    const {Pool} = require("pg");

    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });

    const client = await pool.connect();
    client.release();
    return client;

    global.connection = pool;

}
connect();

async function selecionarPacientes(){
    const client = await connect();
    res = await client.query("SELECT * FROM pacientes");
    return res.rows;
}

async function selecionarPaciente(nome){
    const client = await connect();
    res = await client.query("SELECT * FROM pacientes WHERE nome=$1", [nome]);
    return res.rows;
}

async function inserirPaciente(paciente){
    const client = await connect();
    const sql = "INSERT INTO pacientes(nome, email, telefone, senha) VALUES ($1, $2, $3, $4)";
    const values = [paciente.nome, paciente.email, paciente.telefone, paciente.senha];
    await client.query(sql, values);
}

module.exports = {
    selecionarPacientes,
    selecionarPaciente,
    inserirPaciente
}
    // const db = new Pool({
    // user: 'postgres',
    // host: 'localhost',
    // database: 'clinica_fisio',
    // password: 'sua_senha',
    // port: 5432
    // });