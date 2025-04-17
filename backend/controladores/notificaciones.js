const db = require('../config/db');

// Crear notificación
const crearNotificacion = (req, res) => {
  const { idEstudiante, mensaje } = req.body;

  if (!idEstudiante || !mensaje) {
    return res.status(400).json({ error: 'Faltan parámetros: idEstudiante o mensaje' });
  }

  const fecha = new Date();

  const sql = 'INSERT INTO notificaciones (idEstudiante, mensaje, fecha, estado) VALUES (?, ?, ?, ?)';
  db.query(sql, [idEstudiante, mensaje, fecha, 'pendiente'], (err, result) => {
    if (err) {
      console.error('Error al insertar la notificación:', err);
      return res.status(500).json({ error: 'Error al crear la notificación' });
    }
    res.status(200).json({ mensaje: 'Notificación creada con éxito' });
  });
};

const obtenerNotificaciones = (req, res) => {
  const { rol, idUsuario } = req.query;

  let sql = '';
  let params = [];

  if (rol === 'estudiante') {
    sql = 'SELECT * FROM notificaciones WHERE idEstudiante = ?';
    params = [idUsuario];
  } else if (rol === 'docente' || rol === 'admin') {
    sql = 'SELECT * FROM notificaciones';
  } else {
    return res.status(400).json({ error: 'Rol no válido' });
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error('Error al obtener notificaciones:', err);
      return res.status(500).json({ error: 'Error al obtener notificaciones' });
    }
    res.status(200).json(result);
  });
};

const actualizarNotificacion = (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const sql = 'UPDATE notificaciones SET estado = ? WHERE id = ?';
  db.query(sql, [estado, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la notificación:', err);
      return res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
    res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
  });
};

module.exports = {
  crearNotificacion,
  obtenerNotificaciones,
  actualizarNotificacion
};
