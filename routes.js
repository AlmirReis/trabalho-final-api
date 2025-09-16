
const express = require('express');
const userCtrl = require('./controller/userController');
const bookCtrl = require('./controller/bookController');
const auth = require('./middleware/authenticateToken');

const router = express.Router();

router.post('/api/auth/register', userCtrl.register);
router.post('/api/auth/login', userCtrl.login);
router.get('/api/users', auth, userCtrl.list);

router.post('/api/comprar', auth, bookCtrl.comprarLivro);
router.get('/api/compras', auth, bookCtrl.listarCompras);

module.exports = router;
