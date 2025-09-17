const { expect } = require('chai');
const { comprarLivro, listarCompras } = require('../../../controller/bookController');
const bookService = require('../../../service/bookService');
const sinon = require('sinon');

// importa o model para limpar o array de compras antes de cada teste
const model = require('../../../model/bookModel');

describe('📚 Controller Book', () => {
  beforeEach(() => {
    // limpa as compras acumuladas entre testes
    model.purchases.length = 0;
  });

  afterEach(() => {
    sinon.restore(); // garante que os stubs são limpos
  });

  // -------------------------------
  // TESTES do comprarLivro
  // -------------------------------
  describe('comprarLivro', () => {
    it('deve retornar 201 e a compra quando realizada com sucesso', () => {
      const req = { user: { id: 1 }, body: { titulo: 'Bíblia Sagrada' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(bookService, 'comprarLivroService').returns({
        id: 1,
        userId: 1,
        bookId: 1,
        titulo: 'Bíblia Sagrada',
        date: new Date().toISOString(),
        status: 'sucesso'
      });

      comprarLivro(req, res);

      expect(res.status.firstCall.args[0]).to.equal(201);
      expect(res.json.calledOnce).to.equal(true);

      const payload = res.json.firstCall.args[0];
      expect(payload).to.have.property('titulo', 'Bíblia Sagrada');
      expect(payload).to.have.property('status', 'sucesso');
    });

    it('deve retornar 400 quando o service lança erro de regra de negócio', () => {
      const req = { user: { id: 1 }, body: { titulo: 'A Arte da Guerra' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(bookService, 'comprarLivroService').throws(new Error('Livro sem estoque disponível'));

      comprarLivro(req, res);

      expect(res.status.firstCall.args[0]).to.equal(400);
      expect(res.json.calledOnce).to.equal(true);

      const payload = res.json.firstCall.args[0];
      expect(payload).to.have.property('error', 'Livro sem estoque disponível');
    });

    it('deve retornar 500 quando ocorre um erro inesperado', () => {
      const req = { user: { id: 1 }, body: { titulo: 'Bíblia Sagrada' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(bookService, 'comprarLivroService').throws(new Error('Falha de conexão'));

      comprarLivro(req, res);

      expect(res.status.firstCall.args[0]).to.equal(500);
      expect(res.json.calledOnce).to.equal(true);

      const payload = res.json.firstCall.args[0];
      expect(payload).to.have.property('error', 'internal');
    });
  });

  // -------------------------------
  // TESTES do listarCompras
  // -------------------------------
  describe('listarCompras', () => {
    it('deve retornar uma lista de compras quando houver registros', () => {
      const req = { user: { id: 1 } };
      const res = { json: sinon.spy() };

      sinon.stub(bookService, 'listarComprasService').returns([
        { id: 1, userId: 1, titulo: 'Bíblia Sagrada', date: new Date().toISOString() }
      ]);

      listarCompras(req, res);

      const payload = res.json.firstCall.args[0];
      expect(payload).to.be.an('array').that.is.not.empty;
      expect(payload.length).to.equal(1);
      expect(payload[0]).to.have.property('titulo', 'Bíblia Sagrada');
    });

    it('deve retornar uma lista vazia quando não houver registros', () => {
      const req = { user: { id: 2 } };
      const res = { json: sinon.spy() };

      sinon.stub(bookService, 'listarComprasService').returns([]);

      listarCompras(req, res);

      const payload = res.json.firstCall.args[0];
      expect(payload).to.be.an('array').that.is.empty;
    });
  });
});
