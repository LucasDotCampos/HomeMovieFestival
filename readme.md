# Home Movie Festival

<img src="headerimage.webp" alt="people working on a movie set">
###### PT-BR

## Funções:

-   Criar, listar, alterar e deletar as entidades Users e Movies

## Comentátios:

-   O projeto tem a implementação da S3 (Amazon) para subir os arquivos de imagem, e as linhas de implementação dele estão comentadas pra que a aplicação rode sem a necessidade de ter uma conta na Amazon Web Services.

-   O frontend foi feito pelo meu amigo Juan Israel e está neste link: https://github.com/JuanIWK3/HomeMovieFestival

## Requisitos

-   Node.js
-   Criar um servidor postgres (se tiver Docker instalado basta usar o comando que eu vou deixar abaixo):
-   <code>docker run --name postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres</code>
-   executar as migrations com o comando: <code>npm run typeorm migration:run</code>
-   Excluir a extensão ".example" dos arquivos: "ormconfig.json.example" e ".env.example"
-   Executar o script "dev": <code>"npm run dev"</code>

## Documentação(Swagger):

-   Basta entrar link http://localhost:5555/docs no seu navegador e você será capaz de usar todas as rotas que executarão as funções presentes na aplicação.

## Como utilizar as rotas que precisam de autenticação:

-   Depois de registrar o usuário, utilize a rota /sessions para logar na aplicação e você terá as informações do usuário no retorno.
-   Copie o token sem as aspas, clique no botão "authorize" na parte de cima da página e cole-o.

---

# Home Movie Festival

<img src="headerimage.webp" alt="people working on a movie set">
###### EN

## Functions:

-   Create, Read, Update, Delete Users and Movies entities

## Comments:

-   The project has the S3 implementation to upload image files, and its code is commented so anyone can use this application, even if having no Amazon Web Services account.

-   The frontend was made by my friend Juan Israel and its link is: https://github.com/JuanIWK3/HomeMovieFestival

## Requirements

-   Node.js
-   Create a postgres server (if you have Docker installed, you should use the following command)
-   <code>docker run --name postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres</code>
-   Execute the migrations running: <code>npm run typeorm migration:run</code>
-   Delete files' extension ".example": "ormconfig.json.example" and ".env.example"
-   Execute "dev" script: <code>"npm run dev"</code>

## Swagger documentation:

-   You just have to enter http://localhost:5555/docs link on your browser and you'll be able to use all the routes that will execute de application functions

## How to utilize authorized routes:

-   After you have registered a user, click on the /sessions route to log in the application and you'll the user information on return.
-   Copy the token without quotation marks and click on the "authorize" button up on the page and past the token on it
