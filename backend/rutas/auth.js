const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador.js');

router.post('/registar', authControlador.registar);
router.post('/login', authControlador.login);



module.exports = router;