# API de Compras de Livros

Esta API permite o registro, login, listagem de usuários e compra de livros.  
O objetivo é servir de base para estudos de testes automatizados e automação de APIs com REST e GraphQL.

---

## Tecnologias
- Node.js  
- Express  
- GraphQL (express-graphql)
- Mocha + Chai + Sinon + Supertest (testes automatizados)
- JWT (autenticação)  
- Banco de dados em memória (arrays em variáveis)  

---

## Instalação

Clone o repositório:
```bash
git clone <repo-url>
cd trabalho-final-api-books
```

Instale as dependências:
```bash
npm install
```

---

## Configuração

Antes de rodar, crie um arquivo **.env** na raiz com as variáveis:
```
JWT_SECRET=dev-secret-123
BASE_URL_REST=http://localhost:3000
BASE_URL_GRAPHQL=http://localhost:4000/graphql
```

---

## Como rodar

Para iniciar o servidor REST + GraphQL:
```bash
# Rodar em dois terminais separados ou com "&"
npm run start-rest
npm run start-graphql

```

- **API REST:** [http://localhost:3000](http://localhost:3000)  
- **GraphQL:** [http://localhost:4000/graphql](http://localhost:4000/graphql)  

---

## Endpoints principais

### Registro de usuário
`POST /api/auth/register`  
Body:
```json
{ "username": "string", "password": "string" }
```

### Login
`POST /api/auth/login`  
Body:
```json
{ "username": "string", "password": "string" }
```

### Listar usuários
`GET /api/users` (requer JWT)

### Compras de livros
`POST /comprar` (JWT obrigatório)  
Body:
```json
{ "titulo": "Bíblia Sagrada"}
```

`GET /api/minhas-compras` (JWT obrigatório)

---

## GraphQL Types, Queries e Mutations

Para executar:
```bash
npm run start-graphql
```

Acesse [http://localhost:4000/graphql](http://localhost:4000/graphql)

**Types:**
- User: id, username  
- Compra: id, titulo, status, date 

**Queries:**
- `users`: lista todos os usuários (JWT)  
- `myCompras`: lista compras do usuário logado (JWT)  

**Mutations:**
- `register(username, password): User`  
- `login(username, password): Auth { token }`  
- `comprarLivro(input: CompraInput!): Compra (JWT)`  

---

## Regras de negócio
- Não é permitido registrar usuários duplicados.  
- Login exige usuário e senha válidos.  
- Só é possível comprar livros com estoque > 0.  
- Se o livro não existir, retorna **"Livro não encontrado"**.  
- Se o estoque for 0, retorna **"Livro sem estoque disponível"**.  

---

## Testes

**Testes implementados:**
- Foram implementados testes automatizados em três níveis:

- **Controller (unitários com Sinon):** validam as regras de negócio dos controllers.  
- **REST External (Supertest):** simulam chamadas HTTP reais na API REST.  
- **GraphQL External (Supertest):** simulam chamadas HTTP reais na API GraphQL.  

### Como rodar os testes
```bash
npm test
npm run test-rest-controller
npm run test-rest-external
npm run test-graphql-external
```
