const { books, purchases } = require('../model/bookModel');

function comprarLivroService(userId, { titulo }) {
  if (!titulo) throw new Error('missing_fields');

  // procurar livro
  const book = books.find(b => b.titulo.toLowerCase() === titulo.toLowerCase());
  if (!book) throw new Error('Livro não encontrado');
  if (book.stock <= 0) throw new Error('Livro sem estoque disponível');

  // atualizar estoque
  book.stock -= 1;

  // gerar id da compra
  const id = purchases.length ? Math.max(...purchases.map(p => p.id)) + 1 : 1;

  // criar compra
  const compra = {
    id,
    userId,
    bookId: book.id,
    titulo: book.titulo,   //  "titulo"
    date: new Date().toISOString(),
    status: 'sucesso'      // retorna status
  };

  purchases.push(compra);
  return compra;
}

function listarComprasService(userId) {
  return purchases.filter(p => p.userId === userId);
}

module.exports = { comprarLivroService, listarComprasService };
