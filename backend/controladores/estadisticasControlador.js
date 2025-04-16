const e = require('express');
const db = require('../config/db');

const obtenerEstadisticas = (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS total,
      SUM(estado = 2) AS postulados,
      SUM(estado = 1) AS enProceso,
      SUM(estado = 0) AS finalizados
    FROM usuarios
    WHERE id_rol = 2;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).json({ error: 'Error al obtener estadísticas' });
    }

    const { total, postulados, enProceso, finalizados } = results[0];

    res.json({ total, postulados, enProceso, finalizados });
  });
};


module.exports = {
  obtenerEstadisticas,
};