# API de Compras de Livros

Esta API permite o registro, login, listagem de usuários e compra de livros.  
O objetivo é servir de base para estudos de testes automatizados e automação de APIs com REST e GraphQL.

---

## Tecnologias
- Node.js  
- Express  
- Swagger (documentação)  
- GraphQL (Apollo Server)  
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
npm run start-rest
```

- **API REST:** [http://localhost:3000](http://localhost:3000)  
- **Swagger:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
- **GraphQL:** [http://localhost:4000/graphql](http://localhost:4000/graphql)  

---

## Endpoints principais

### Registro de usuário
`POST /users/register`  
Body:
```json
{ "username": "string", "password": "string" }
```

### Login
`POST /users/login`  
Body:
```json
{ "username": "string", "password": "string" }
```

### Listar usuários
`GET /users` (requer JWT)

### Compras de livros
`POST /comprar` (JWT obrigatório)  
Body:
```json
{ "from": "string", "to": "string", "value": number }
```

`GET /comprar` (JWT obrigatório)

---

## GraphQL Types, Queries e Mutations

Para executar:
```bash
npm run start-graphql
```

Acesse [http://localhost:4000/graphql](http://localhost:4000/graphql)

**Types:**
- User: id, username  
- Compra: id, from, to, value, date  

**Queries:**
- `users`: lista todos os usuários (JWT)  
- `myCompras`: lista compras do usuário logado (JWT)  

**Mutations:**
- `register(username, password): User`  
- `login(username, password): Auth { token }`  
- `comprar(from, to, value): Compra (JWT)`  

---

## Regras de negócio
- Não é permitido registrar usuários duplicados.  
- Login exige usuário e senha válidos.  
- Só é possível comprar livros com estoque > 0.  
- Se o livro não existir, retorna **"Livro não encontrado"**.  
- Se o estoque for 0, retorna **"Livro sem estoque disponível"**.  

---

## Testes

O arquivo **app.js** pode ser importado em ferramentas como **Supertest**.  
Para testar a API GraphQL, importe **graphql/app.js** nos testes.  

**Testes implementados:**
- Controller (Sinon)  
- REST External (Supertest)  
- GraphQL External (Supertest)  

Rodar todos os testes:
```bash
npm test
```
