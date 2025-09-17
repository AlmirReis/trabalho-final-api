const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../../../graphql/schema');
const resolvers = require('../../../graphql/resolvers');
const request = require('supertest');
const chai = require('chai');

const { createApp } = require('../../../app');
const loginBody = require('../../rest/fixture/requisicoes/login/loginUser.json');
const compraOK = require('../../rest/fixture/requisicoes/compras/createCompra.json');
const compraSemEstoque = require('../../rest/fixture/requisicoes/compras/createCompraSemEstoque.json');
const compraNaoEncontrado = require('../../rest/fixture/requisicoes/compras/createCompraLivroNaoEncontrado.json');

let token;
let appGraphQL;

// 🔧 antes de tudo, preparar REST p/ login e o app GraphQL inline
before(async () => {
  const restApp = createApp();

  // registra usuário (ignora se já existe)
  await request(restApp).post('/api/auth/register').send(loginBody);

  // faz login e pega token
  const res = await request(restApp).post('/api/auth/login').send(loginBody);
  token = res.body.token;

  // cria app GraphQL inline (não depende de npm start)
  appGraphQL = express();
  appGraphQL.use(
    '/graphql',
    graphqlHTTP((req) => ({
      schema,
      rootValue: resolvers,
      context: req,
      graphiql: false,
    }))
  );
});

describe('GraphQL Compras - Livros', () => {
  it('compra Bíblia Sagrada com sucesso via GraphQL', async () => {
    const query = `
      mutation {
        comprarLivro(input: { titulo: "${compraOK.titulo}" }) {
          id
          titulo
          status
          date
        }
      }
    `;

    const res = await request(appGraphQL)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({ query });

    if (res.body.errors) console.error('GraphQL errors:', res.body.errors);

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body.data.comprarLivro.titulo).to.equal('Bíblia Sagrada');
    chai.expect(res.body.data.comprarLivro.status).to.equal('sucesso');
  });

  it('falha ao comprar A Arte da Guerra (sem estoque) via GraphQL', async () => {
    const query = `
      mutation {
        comprarLivro(input: { titulo: "${compraSemEstoque.titulo}" }) {
          id
          titulo
          status
        }
      }
    `;

    const res = await request(appGraphQL)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({ query });

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body.errors[0].message).to.equal('Livro sem estoque disponível');
  });

  it('falha ao comprar Dominando o Delphi (não encontrado) via GraphQL', async () => {
    const query = `
      mutation {
        comprarLivro(input: { titulo: "${compraNaoEncontrado.titulo}" }) {
          id
          titulo
          status
        }
      }
    `;

    const res = await request(appGraphQL)
      .post('/graphql')
      .set('Authorization', 'Bearer ' + token)
      .send({ query });

    chai.expect(res.status).to.equal(200);
    chai.expect(res.body.errors[0].message).to.equal('Livro não encontrado');
  });
});
