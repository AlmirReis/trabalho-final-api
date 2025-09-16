
const bcrypt = require('bcryptjs');
const { users } = require('../model/userModel');

function register({ username, password }) {
  if (!username || !password) throw new Error('missing_fields');
  const exists = users.find(u=>u.username === username);
  if (exists) throw new Error('user_exists');
  const id = users.length ? Math.max(...users.map(u=>u.id))+1 : 1;
  const passwordHash = bcrypt.hashSync(password,8);
  const user = { id, username, passwordHash };
  users.push(user);
  return { id, username };
}

function login({ username, password }) {
  const user = users.find(u=>u.username===username);
  if (!user) throw new Error('invalid_credentials');
  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) throw new Error('invalid_credentials');
  return { id: user.id, username: user.username };
}

function listUsers(){
  return users.map(u=>({ id:u.id, username:u.username }));
}

module.exports = { register, login, listUsers };
