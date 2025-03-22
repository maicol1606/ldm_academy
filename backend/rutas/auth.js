const express = require('express');
const router = express.Router();
const authControlador = require('../controladores/authControlador.js');

router.post('/registar', authControlador.registar);
router.post('/login', authControlador.login);
router.get('/validarToken', authControlador.validarToken);
router.post('/enviarCodigo', authControlador.enviarCodigo);
router.put('/recuperar', authControlador.recuperar);

module.exports = router;