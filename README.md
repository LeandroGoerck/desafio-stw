# Desafio-STW
Criar o frontend e o backend para criação e edição de listas de receitas


# Descritivo do desafio
## Backend
O desafio é implementar um backend REST para uma aplicação de criação e edição de receitas.

Com as seguintes funcionalidades:
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
- [Licença](#licença)
- [Habilidades desenvolvidas](#habilidades-desenvolvidas)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Organização e Estruturação do Projeto](#organização-e-estruturação-do-projeto)
- [Pré-requisitos](#pré-requisitos)
  - [Ferramentas necessárias](#ferramentas-necessárias)
  - [Rodando no servidor local](#rodando-no-servidor-local)
  - [Quer contribuir com o projeto?](#quer-contribuir-com-o-projeto)
- [Orientações detalhadas de como utilizar](#orientações-detalhadas-de-como-utilizar)
  - [Ingredients](#ingredients)
    - [Ingredients create](#ingredients-create)
    - [Ingredients getAll](#ingredients-getall)
    - [Ingredients getById](#ingredients-getbyid)
    - [Ingredients updateById](#ingredients-updatebyid)
    - [Ingredients deleteById](#ingredients-deletebyid)
  - [Recipes](#recipes)
    - [Recipes create](#recipes-create)
    - [Recipes getAll](#recipes-getall)
    - [Recipes getById](#recipes-getbyid)
    - [Recipes updateById](#recipes-updatebyid)
    - [Recipes deleteById](#recipes-deletebyid)
    - [RecipesIngredient](#recipes-ingredient)
    - [RecipesIngredient addIngredient](#recipes-ingredient-addingredient)
    - [RecipesIngredient removeIngredient](#recipes-ingredient-removeingredient)
    - [RecipesIngredient updateIngredientById](#recipes-ingredient-updateingredientbyId)
    - [RecipesIngredient swapIngredients](#recipes-ingredient-swapingredients)
    - [RecipesCreate createOrUpdate](#recipes-create-createorupdate)

- [Contribuição](#contribuição)
- [Agradecimentos](#agradecimentos)
- [Autor](#autor)

O banco de dados utilizado está ilustrado na figura abaixo:
  ![Planejamento do Banco](./imagens/planejamento_banco.png)

  ---

# Status

Este projeto está em desenvolvimento.

---

# Licença

Este projeto esta sob a licença [MIT](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT).

---

# Habilidades desenvolvidas

- Criação do backend com express e typescript
- Teste das rotas utilizando Postman
- Integração com mysql utilzando Prisma ORM
- Desenvolvimento de telas com React, javascript e hooks
- Criação, leitura, edição e exclusão (CRUD) de ingredientes
- CRUD de receitas com ingredientes cadastrados

---

# Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [Typescript](https://www.typescriptlang.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [React](https://create-react-app.dev/docs/getting-started)
- [Tailwindcss](https://tailwindcss.com/docs/guides/create-react-app)
- [Postman](https://www.postman.com/)

---

# Organização e Estruturação do Projeto

O projeto está organizado e estruturado da seguinte maneira:

# Pré-requisitos

## Ferramentas necessárias

Para rodar o projeto, você vai precisar instalar as seguintes ferramentas:
 - [Git](https://git-scm.com);
 - [Node.js](https://nodejs.org/en/);
 - Um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/) ou outro de sua preferência;