# Home Movie Festival

<img src="headerimage.webp" alt="people working on a movie set">
###### PT-BR

## Funções:

-   Criar, listar, alterar e deletar as entidades Users e Movies

## Comentátios:

-   Se você tentar colocar esse projeto no Heroku, você não será capaz de consumir essas imagens, você precisará subir esses arquivos em um serviço como o S3, então eu fiz um middleware pra subir as imagens pro s3 se você preferir.
    Você precisará colocar esse middleware nas rotas onde você sobe imagens.

-   O frontend foi feito pelo meu amigo Juan Israel e está neste link: https://github.com/JuanIWK3/HomeMovieFestival

## P.S

-   Se você quiser consumir as imagens num frontend você terá que usar a rota como no exemplo a seguir: <code>http://localhost:5555/files/profilepic.png</code>

## Requisitos

-   Node.js
-   Criar um servidor postgres (se tiver Docker instalado basta usar o comando que eu vou deixar abaixo):
-   <code>docker run --name postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres</code>
-   executar as migrations com o comando: <code>npm run typeorm migration:run -d src/shared/typeorm/connection</code>
-   Excluir a extensão ".example" dos arquivo ".env.example"
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

-   If you try to put this project on Heroku, you will not be able to consume these images, you will need to upload these files on service like S3, so I made a middleware to upload images to S3 if you prefer.
    You will need to put this middleware on routes you upload images.

-   The frontend was made by my friend Juan Israel and its link is: https://github.com/JuanIWK3/HomeMovieFestival

## P.S

-   If you want to consume these images on a frontend application, you will need to use a route like in this example: <code>http://localhost:5555/files/profilepic.png</code>

## Requirements

-   Node.js
-   Create a postgres server (if you have Docker installed, you should use the following command)
-   <code>docker run --name postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres</code>
-   Execute the migrations running: <code>npm run typeorm migration:run -d src/shared/typeorm/connection</code>
-   Delete files' extension ".example": "ormconfig.json.example" and ".env.example"
-   Execute "dev" script: <code>"npm run dev"</code>

## Swagger documentation:

-   You just have to enter http://localhost:5555/docs link on your browser and you'll be able to use all the routes that will execute de application functions

## How to utilize authorized routes:

-   After you have registered a user, click on the /sessions route to log in the application and you'll the user information on return.
-   Copy the token without quotation marks and click on the "authorize" button up on the page and past the token on it
