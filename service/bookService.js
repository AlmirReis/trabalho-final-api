
const { books, purchases } = require('../model/bookModel');

function comprarLivroService(userId, { title }){
  if (!title) throw new Error('missing_fields');
  const book = books.find(b=>b.title.toLowerCase()===title.toLowerCase());
  if (!book) throw new Error('Livro não encontrado');
  if (book.stock <= 0) throw new Error('Livro sem estoque disponível');
  book.stock -= 1;
  const id = purchases.length ? Math.max(...purchases.map(p=>p.id))+1 : 1;
  const compra = { id, userId, bookId: book.id, title: book.title, date: new Date().toISOString() };
  purchases.push(compra);
  return compra;
}

function listarComprasService(userId){
  return purchases.filter(p=>p.userId===userId);
}

module.exports = { comprarLivroService, listarComprasService };
