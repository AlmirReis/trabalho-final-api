
const bcrypt = require('bcryptjs');
// in-memory
const users = [
  { id:1, username:'almir', passwordHash: bcrypt.hashSync('123',8) },
];
module.exports = { users };
