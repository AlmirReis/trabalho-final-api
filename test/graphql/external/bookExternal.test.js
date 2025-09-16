
const request = require('supertest');
const { createApp } = require('../../../app'); // use REST login to get token
const loginBody = require('../../rest/fixture/requisicoes/login/loginUser.json');
const compraOK = require('../../rest/fixture/requisicoes/compras/createCompra.json');
const compraSemEstoque = require('../../rest/fixture/requisicoes/compras/createCompraSemEstoque.json');
const compraNaoEncontrado = require('../../rest/fixture/requisicoes/compras/createCompraLivroNaoEncontrado.json');

describe('GraphQL Compras - Livros', ()=>{
  let token;
  let app;

  before(async ()=>{
    app = createApp();
    await request(app).post('/api/auth/register').send(loginBody);
    const r = await request(app).post('/api/auth/login').send(loginBody);
    token = r.body.token;
  });

  it('compra Bíblia Sagrada com sucesso via GraphQL', async ()=>{
    // Para executar este teste de forma "external", suba o servidor GraphQL antes.
    // npm run start-graphql
  });

  it('falha ao comprar A Arte da Guerra (sem estoque) via GraphQL', async ()=>{});
  it('falha ao comprar Dominando o Delphi (não encontrado) via GraphQL', async ()=>{});
});
