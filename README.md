# Desafio-STW
A produção de uma fábrica de farinhas trabalha diariamente com diversos tipos de receitas.
Essas receitas possuem um conjunto de ingredientes que devem ser consumidos na ordem em que foram salvos.
Atualmente as receitas já estão organizadas em planilhas do Excel e são impressas sempre que uma receita é finalizada.
O desafio é implementar o frontend e backend de uma aplicação web para cadastro de receitas para eliminar a impressão em papel e facilitar o gerenciamento das mesmas.


A aplicação deve ter as seguintes funcionalidades:
1. Receitas
  - [x] Listar receitas
  - [x] Listar uma determinada receita com seus respectivos ingredientes
  - [x] Adicionar uma nova receita com seus respectivos ingredientes
  - [x] Atualizar uma receita com seus respectivos ingredientes
  - [x] Excluir uma receita

2. Ingredientes
  - [x] Listar os ingredientes
  - [x] Adicionar um novo ingrediente
  - [x] Atualizar um ingrediente
  - [x] Excluir um ingrediente

---

# Sumário

- [Status](#status)
- [Habilidades desenvolvidas](#habilidades-desenvolvidas)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Organização e Estruturação do Projeto](#organização-e-estruturação-do-projeto)
- [Organização e Estruturação do Banco de Dados](#organização-e-estruturação-do-banco-de-dados)  
- [Pré-requisitos](#pré-requisitos)
  - [Ferramentas necessárias](#ferramentas-necessárias)
  - [Rodando no servidor local](#rodando-no-servidor-local)
- [Orientações de como utilizar a página WEB](#orientações-de-como-utilizar-a-página-WEB)


  ---

# Status

Este projeto está em concluido, porém sugestões de melhorias são sempre bem vindas!

---

# Habilidades desenvolvidas

- Criação do backend com express e typescript
- Teste das rotas utilizando Postman
- Integração com mysql utilizando Prisma ORM
- Desenvolvimento de telas com React, javascript e hooks
- Criação, leitura, edição e exclusão (CRUD) de ingredientes
- CRUD de receitas com ingredientes cadastrados
- Estilização e responsividade com Tailwindcss

---

# Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [React](https://create-react-app.dev/docs/getting-started)
- [Tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
- [Prisma](https://www.prisma.io/docs/getting-started/quickstart)
- [Postman](https://www.postman.com/)

---

# Organização e Estruturação do Projeto

O projeto está organizado e estruturado da seguinte maneira:
```
├── backend
│   ├── example.env
│   ├── package.json
│   ├── package-lock.json
│   ├── prisma
│   │   ├── migrations
│   │   │   ├── 20220830035300_init
│   │   │   │   └── migration.sql
│   │   │   └── migration_lock.toml
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   ├── ingredientsController.ts
│   │   │   └── recipesController.ts
│   │   ├── database
│   │   │   └── prismaClient.ts
│   │   ├── interfaces
│   │   │   ├── IAddIngredient.ts
│   │   │   ├── ICreateOrUpdateRecipe.ts
│   │   │   ├── ICreateRecipe.ts
│   │   │   ├── IIngredient.ts
│   │   │   ├── IRecipe.ts
│   │   │   └── ISwapIngredient.ts
│   │   ├── middlewares
│   │   │   └── errorMiddleware.ts
│   │   ├── routes
│   │   │   ├── ingredientsRoutes.ts
│   │   │   └── recipesRoutes.ts
│   │   ├── server.ts
│   │   └── services
│   │       ├── customError.ts
│   │       ├── errors.ts
│   │       ├── ingredientsService.ts
│   │       └── recipesService.ts
│   └── tsconfig.json
├── frontend
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── stw.svg
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components
│   │   │   ├── AddIngredientToRecipeForm2.jsx
│   │   │   ├── AddIngredientToRecipeForm.jsx
│   │   │   ├── CodeAndDescriptionForm.jsx
│   │   │   ├── IngredientSelect.jsx
│   │   │   ├── IngredientsTable.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── RecipesForm.jsx
│   │   │   ├── RecipesTable.jsx
│   │   │   ├── RecipeWithIngredientsTable2.jsx
│   │   │   └── RecipeWithIngredientsTable.jsx
│   │   ├── context
│   │   │   ├── GlobalContext.js
│   │   │   └── GlobalProvider.jsx
│   │   ├── helpers
│   │   │   └── request.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── Ingredients.jsx
│   │   │   ├── RecipeCreate.jsx
│   │   │   ├── RecipeDetails.jsx
│   │   │   └── Recipes.jsx
│   │   ├── reportWebVitals.js
│   │   ├── routes
│   │   │   └── index.js
│   │   └── setupTests.js
│   └── tailwind.config.js
├── imagens
│   ├── criacao_de_receita.png
│   ├── ingredientes.png
│   ├── planejamento_banco.png
│   └── receitas.png
├── package-lock.json
├── README.md
```
---
## Organização e Estruturação do Banco de Dados  
O banco de dados utilizado está ilustrado na figura abaixo:
  ![Planejamento do Banco](./imagens/planejamento_banco.png)

---
# Pré-requisitos

## Ferramentas necessárias

Para rodar o projeto, você vai precisar instalar as seguintes ferramentas:
 - [Git](https://git-scm.com);
 - [Node.js >= 14.17](https://nodejs.org/en/);
 - Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) ou outro de sua preferência;

 ## Rodando no servidor local

 - Clone do Projeto e instale as dependências

    - Clone este repositório
    ```bash
    git clone git@github.com:LeandroGoerck/desafio-stw.git
    ```

    - Acesse a pasta do projeto no terminal/cmd
    ```bash
    cd desafio-stw
    ```

    - Instale as dependências do backend e do frontend
    ```bash
    cd backend/ && npm install && cd ../frontend && npm install
    ```
    - Configure as variaveis de ambiente
    No ubuntu
 - Renomeie o arquivo `example.env` para `.env` ou crie um novo arquivo chamado `.env` na raiz do projeto de backend com as seguintes configurações:
    - DATABASE_URL="mysql://root:1234@localhost:3306/banco_receitas"
  
    Se você estiver usando WSL, digite o comando:
    ```bash
    set DATABASE_URL="mysql://root:1234@localhost:3306/banco_receitas"
    ```  
    - Suba uma instância do banco de dados mysql:
    Utilizando um container docker:
    ```bash
    docker run -p 3306:3306 --name mysql_80 -e MYSQL_ROOT_PASSWORD=1234 -d mysql:8 mysqld --default-authentication-plugin=mysql_native_password
    ```

    - Rode as migrations do prisma para criar as tabelas:
    ```bash
    npx prisma migrate dev --name init
    ```

 - Inicie o sistema:

    - Inicie o backend
    ```bash
    cd backend && npm start
    ```
    - Inicie o frontend
    ```bash
    cd frontend && npm start
    ```
    Abra em qualquer navegador http://localhost:3000/

---
# Orientações de como utilizar a página WEB

A aplicação WEB possui três telas, e é possível navegar por elas através da barra de navegação.
Os botões RECEITAS, INGREDIENTES e CRIAÇÃO DE RECEITA navegam por essas três telas. 

A primeira tela a ser preenchida pelo usuário é a de ingredientes, onde serão cadastrados os ingredientes utilizados na fabricação das farinhas. Para isso, basta digitar o código e a descrição do ingrediente e clicar no botão de adicionar.
Para editar um ingrediente basta clicar no botão do lápis, os campos de edição aparecem na mesma linha da tabela. Para excluir um ingrediente, basta clicar no botão da lixeira. A imagem abaixo ilustra a tela de cadastro de ingredientes:

  ![Cadastro de ingredientes](./imagens/ingredientes.png)

Em seguida, para criar uma nova receita, clique no botão CRIAÇÃO DE RECEITA na barra de navegação. Aqui o usuário pode selecionar os ingredientes e a quantidade em kg a ser adicionada na receita. Para salvar a receita no banco de dados, o código e a descrição da receita devem ser preenchidos. A figura abaixo ilustra a tela de criação de receitas:
  ![Criação de receitas](./imagens/criacao_de_receita.png)

Por fim, para gerenciar todas as receitas criadas, basta clicar no botão RECEITAS. Nessa tela, alem de ser possivel criar uma receita nova, cada receita possui um botão para editar e outro para excluir a mesma. A figura abaixo ilustra a tela de visualização de receitas:
  ![Visualização da lista de receitas](./imagens/receitas.png)
