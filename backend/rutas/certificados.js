const express = require('express');
const router = express.Router();
const certificadoControlador = require('../controladores/certificadoControlador');

router.get('/mostrarCertificados', certificadoControlador.mostrarCertificados);

module.exports = router;
