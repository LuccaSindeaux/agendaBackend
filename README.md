# agendaBackend
Backend da agenda da cadeira de Gestão Ágil 2025/1


Iniciando o projeto, sendo decretado que usaremos Node.js e Express, rodei os seguintes comandos em terminal
    1 - npm init -y
    2 - npm install express pg cors body-parser

Baixando o Postman no meu computador, defini o seguinte link para testes:
    http://localhost:3000/agendar

As tabelas de usuário e pacientes possuirão senhas. Por boas práticas mercadológicas, devemos criptografar as senhas:
    - Utilização do bcrypt  --> npm install bcrypt

Quanto a organização de pastas, dado que nosso projeto terá uma lógica de login dos usuários da clínica, e uma de agendamentos:
    - Foram criados dois arquivos: login.js e agendamento.js, dentro de uma pasta "routes";
    - O arquivo index.js é nosso "main" e continua fora de qualquer pasta, apensas invoando as lógicas dos demais arquivos.
    - Como é necessário a cripotgrafia somente em usuários, ela não foi aplicada em agendamento.js.

Autenticação JWT:
    Geração de tokens seguros antes das nossas rotas serem acessadas. O arquivo de autenticação é colcoado numa pasta separada, chamada de middleware. 
    Para que funcione, temos de LEMBRAR O PESSOAL DO FRONT de inserir:
        Authorization: Bearer <token-aqui>

Obs.: Linha 6 do login.js -> estudar melhor algo mais dentro das práticas do mercado do que o nome "const SECRET = 'segredo_jwt; "

O arquivo horarios.js foi criado ara organizar as rotas relacionadas aos horários disponíveis (criar, listar, editar, excluir horários que a fisioterapeuta gerencia). Ajuda ambém na organização do código.