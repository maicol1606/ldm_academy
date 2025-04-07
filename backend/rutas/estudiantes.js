const express = require('express');
const router = express.Router();
const estudiantesControlador = require('../controladores/estudiantesControlador');

router.get('/obtenerEstudiantes/:idCampaña', estudiantesControlador.obtenerEstudiantes);

router.put('/actualizarEstudiante/:id', estudiantesControlador.actualizarEstudiante);

router.delete('/eliminarEstudiante/:id', estudiantesControlador.eliminarEstudiante);

router.put('/restaurarEstudiante/:id', estudiantesControlador.restaurarEstudiante);

router.get('/conteoEstudiantes', estudiantesControlador.conteoEstudiantes);

router.get('/mostrarHorasEstudiante/:id/:fecha', estudiantesControlador.mostrarHorasEstudiante);

module.exports = router;
