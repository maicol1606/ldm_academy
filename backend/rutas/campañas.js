const express = require('express');
const router = express.Router();
const campañasControlador = require('../controladores/campañasControlador');

router.post('/agregarCampana', campañasControlador.agregarCampana);

router.delete('/eliminarCampana/:id', campañasControlador.eliminarCampana);

router.put('/actualizarCampana/:id', campañasControlador.actualizarCampana);

router.get('/mostrarCampanas', campañasControlador.mostrarCampanas);

router.get('/mostrarCampana/:nom_campana', campañasControlador.mostrarCampanaNombre);

router.get('/mostrarCampanaPorId/:id', campañasControlador.mostrarCampanaId);

router.delete('/eliminarPorCupos/:id', campañasControlador.eliminarPorCupos);

module.exports = router;