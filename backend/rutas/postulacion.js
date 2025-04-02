const express = require('express');
const router = express.Router();
const postulacionControlador = require('../controladores/postulacionControlador');

router.get('/mostrarPostulaciones', postulacionControlador.mostrarPostulaciones);

router.get('/mostrarPostulacion/:id', postulacionControlador.mostrarPostulacionesUsuario);

router.post('/agregarPostulacion', postulacionControlador.agregarPostulacion);

router.delete('/eliminarPostulacion/:id', postulacionControlador.eliminarPostulacion);

router.put('/actualizarPostulacion/:id', postulacionControlador.actualizarPostulacion);

module.exports = router;