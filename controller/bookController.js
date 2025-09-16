
const { comprarLivroService, listarComprasService } = require('../service/bookService');

function comprarLivro(req,res){
  try{
    const compra = comprarLivroService(req.user.id, req.body);
    return res.status(201).json(compra);
  }catch(e){
    const known=['missing_fields','invalid_value','Livro não encontrado','Livro sem estoque disponível'];
    if (known.includes(e.message)) return res.status(400).json({error:e.message});
    return res.status(500).json({error:'internal'});
  }
}

function listarCompras(req,res){
  return res.json(listarComprasService(req.user.id));
}

module.exports = { comprarLivro, listarCompras };
