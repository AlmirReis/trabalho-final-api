
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secretlivros123';

module.exports = function authenticateToken(req, res, next) {
  const auth = req.headers['authorization'] || '';
  const token = auth.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'no_token' });
  try {
    const payload = jwt.verify(token, SECRET);
    req.user = { id: payload.id, username: payload.username };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid_token' });
  }
}
