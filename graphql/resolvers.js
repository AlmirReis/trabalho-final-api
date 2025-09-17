const jwt = require('jsonwebtoken');
const userSvc = require('../service/userService');
const bookSvc = require('../service/bookService');

const SECRET = process.env.JWT_SECRET || 'secretlivros123';

function authFromContext(ctx) {
  const h = ctx.headers?.authorization || '';
  const token = h.split(' ')[1];
  if (!token) throw new Error('no_token');
  try {
    return jwt.verify(token, SECRET);
  } catch (e) {
    throw new Error('invalid_token');
  }
}

module.exports = {
  users: (_, __, ctx) => {
    authFromContext(ctx);
    return userSvc.listUsers();
  },

  myCompras: (_args, _args2, ctx) => {
    const user = authFromContext(ctx);
    return bookSvc.listarComprasService(user.id);
  },

  register: ({ username, password }) => userSvc.register({ username, password }),

  login: ({ username, password }) => {
    const user = userSvc.login({ username, password });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET,
      { expiresIn: '1h' }
    );
    return { token, user };
  },

  comprarLivro: ({ input }, ctx) => {
    const user = authFromContext(ctx);
    try {
      const compra = bookSvc.comprarLivroService(user.id, { titulo: input.titulo });
      return { ...compra, status: 'sucesso' };
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
