-- SUGESTÃO DE DATABASE


-- Estudar o comando abaixo:
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cria o banco de dados
CREATE DATABASE clinica_fisio;
USE clinica_fisio;


-- Tabela que salva o login da fisio e de uma equipe que ela possa vir a ter
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  tipo VARCHAR(20) DEFAULT 'fisioterapeuta' -- ou 'admin', 'secretaria', etc.
);


-- Tabela de pacientes
CREATE TABLE pacientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  email_login VARCHAR(100) UNIQUE,
  senha VARCHAR(255)
);

-- Tabela de horários disponíveis
CREATE TABLE horarios_disponiveis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  disponibilidade BOOLEAN DEFAULT FALSE
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  paciente_id INT,
  horario_id INT,
  data_agendamento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
  FOREIGN KEY (horario_id) REFERENCES horarios_disponiveis(id)
);
