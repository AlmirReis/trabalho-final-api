
const { expect } = require('chai');
const { listarCompras } = require('../../../controller/bookController');
const svc = require('../../../service/bookService');
const sinon = require('sinon');

describe('Controller listarCompras (Livros)', ()=>{
  it('responde json chamando o service real', ()=>{
    const req = { user: { id: 1 } };
    const res = { json: sinon.spy() };
    sinon.stub(svc, 'listarComprasService').returns([{ id: 1, userId:1, title:'Bíblia Sagrada', date: new Date().toISOString() }]);
    listarCompras(req,res);
    expect(res.json.calledOnce).to.equal(true);
    const payload = res.json.getCall(0).args[0];
    expect(Array.isArray(payload)).to.equal(true);
    svc.listarComprasService.restore();
  });
});
