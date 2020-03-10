# ProjectNode
Api com Node.Js, express e mongoDb voltada para estudos sobre o assunto

O que é o node?
-Node.js é um interpretador de JavaScript assíncrono com código aberto orientado a eventos, criado por Ryan Dahl em 2009, focado em migrar a programação do Javascript do cliente para os servidores

O que é express?
-Express é um framework para Node. js inspirado no Sinatra. Ele é minimalista, flexível e contém um robusto conjunto de recursos para desenvolver aplicações web, como um sistema de Views intuitivo (MVC), um robusto sistema de roteamento, um executável para geração de aplicações e muito mais

O que é uma api?
-API é um conjunto de rotinas e padrões de programação para acesso a um aplicativo de software ou plataforma baseado na Web. A sigla API refere-se ao termo em inglês "Application Programming Interface" que significa em tradução para o português "Interface de Programação de Aplicativos".

Para iniciar a aplicacação:

nodemon src/index.js

# Atividades posssiveis com esta aplicação(Grupo de rotas):

para cadastro de novo usuario:

http://localhost:8000/auth/register

envia um Json parecido com este:

{
"name": "Miguel Gabriel",
"email": "gabriel@gmail.com",
"password": "miguel1234567"
}

recebe os dados e verifica se uma conta com o E-mail informado já existe no banco de dados.
-----------------------------------------------------------------------------------------------------------------------------

para autenticação de usuario

http://localhost:8000/auth/authenticate

o usuario recebe um Token com duração de 1h para poder ter acesso as operações basicas da Api.

envia um Json parecido com este:

{
"email": "gabriel@gmail.com",
"password": "miguel1234567"
}
-----------------------------------------------------------------------------------------------------------------------------

# operações possiveis com a Api:

