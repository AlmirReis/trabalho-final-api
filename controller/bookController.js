// importa o módulo inteiro (assim os stubs do Sinon funcionam nos testes)
const bookService = require('../service/bookService');

function comprarLivro(req, res) {
  try {
    const compra = bookService.comprarLivroService(req.user.id, req.body);
    return res.status(201).json(compra);
  } catch (e) {
    // erros de negócio conhecidos
    const known = [
      'missing_fields',
      'Livro não encontrado',
      'Livro sem estoque disponível'
    ];

    if (known.includes(e.message)) {
      return res.status(400).json({ error: e.message });
    }

    // qualquer outro erro inesperado
    return res.status(500).json({ error: 'internal' });
  }
}

function listarCompras(req, res) {
  const compras = bookService.listarComprasService(req.user.id);
  return res.json(compras);
}

module.exports = { comprarLivro, listarCompras };
