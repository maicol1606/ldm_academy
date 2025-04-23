const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador.js');

router.post('/registrar', authControlador.registrar);
router.post('/login', authControlador.login);
router.get('/validarToken', authControlador.validarToken);
router.post('/enviarCodigo', authControlador.enviarCodigo);
router.put('/recuperar', authControlador.recuperar);

module.exports = router;