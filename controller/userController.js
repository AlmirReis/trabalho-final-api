
const jwt = require('jsonwebtoken');
const svc = require('../service/userService');
const SECRET = process.env.JWT_SECRET || 'secretlivros123';

function register(req, res){
  try {
    const user = svc.register(req.body);
    return res.status(201).json(user);
  } catch(e){
    const msg = e.message;
    if (['missing_fields','user_exists'].includes(msg)) return res.status(400).json({error:msg});
    return res.status(500).json({error:'internal'});
  }
}

function login(req, res){
  try {
    const user = svc.login(req.body);
    const token = jwt.sign({ id:user.id, username:user.username }, SECRET, { expiresIn:'1h' });
    return res.json({ token, user });
  } catch(e){
    if (e.message==='invalid_credentials') return res.status(400).json({error:'invalid_credentials'});
    return res.status(500).json({error:'internal'});
  }
}

function list(req,res){
  return res.json(svc.listUsers());
}

module.exports = { register, login, list };
