const express = require('express');
const router = express.Router();
const docentesControlador = require('../controladores/docentesControlador');

router.get('/obtenerDocentes', docentesControlador.obtenerDocentes);