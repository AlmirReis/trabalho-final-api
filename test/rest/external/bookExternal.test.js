
const request = require('supertest');
const { createApp } = require('../../../app');
const app = createApp();

const loginBody = require('../fixture/requisicoes/login/loginUser.json');
const compraOK = require('../fixture/requisicoes/compras/createCompra.json');
const compraSemEstoque = require('../fixture/requisicoes/compras/createCompraSemEstoque.json');
const compraNaoEncontrado = require('../fixture/requisicoes/compras/createCompraLivroNaoEncontrado.json');

let token;

describe('REST Compras (protegido) - Livros', ()=>{
  before(async ()=>{
    await request(app).post('/api/auth/register').send(loginBody); // ignore errors
    const res = await request(app).post('/api/auth/login').send(loginBody);
    token = res.body.token;
  });

  it('compra Bíblia Sagrada com sucesso', async ()=>{
    const res = await request(app).post('/api/comprar').set('Authorization','Bearer '+token).send(compraOK);
    if (res.status !== 201) console.error('Body:', res.body);
    require('chai').expect(res.status).to.equal(201);
  });

  it('falha ao comprar A Arte da Guerra (sem estoque)', async ()=>{
    const res = await request(app).post('/api/comprar').set('Authorization','Bearer '+token).send(compraSemEstoque);
    require('chai').expect(res.status).to.equal(400);
    require('chai').expect(res.body.error).to.equal('Livro sem estoque disponível');
  });

  it('falha ao comprar Dominando o Delphi (não encontrado)', async ()=>{
    const res = await request(app).post('/api/comprar').set('Authorization','Bearer '+token).send(compraNaoEncontrado);
    require('chai').expect(res.status).to.equal(400);
    require('chai').expect(res.body.error).to.equal('Livro não encontrado');
  });
});
