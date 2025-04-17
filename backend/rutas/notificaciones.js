const express = require('express');
const router = express.Router();
const {
  crearNotificacion,
  obtenerNotificaciones,
  actualizarNotificacion
} = require('../controladores/notificaciones');


router.get('/notificaciones', obtenerNotificaciones);


router.post('/notificaciones', crearNotificacion);


router.put('/notificaciones/:id', actualizarNotificacion);

module.exports = router;
