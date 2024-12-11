const express = require('express');
const router = express.Router();
const asistenciaControlador = require('../controladores/asistenciaControlador');

router.get('/mostrarAsistencias', asistenciaControlador.mostrarAsistencias);

router.post('/agregarAsistencia', asistenciaControlador.agregarAsistencia);

router.delete('/eliminarAsistencia/:id', asistenciaControlador.eliminarAsistencia);

router.put('/actualizarAsistencia/:id', asistenciaControlador.actualizarAsistencia);

module.exports = router;