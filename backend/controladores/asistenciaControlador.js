const e = require('express');
const db = require('../config/db');

exports.mostrarAsistenciasPorEstudiante = (req, res) => {
    const idUsuario = req.params.id;
  
    const query = 'SELECT * FROM asistencia WHERE id_usuario = ?';
    db.query(query, [idUsuario], (err, result) => {
      if (err) {
        console.error('Error al obtener asistencias por estudiante:', err);
        res.status(500).json({ error: 'Error al obtener asistencias' });
      } else {
        res.status(200).json(result);
      }
    });
  };

  
  


exports.agregarAsistencia = (req, res) => {
    const id_campaña = req.body.id_campaña;
    const id_usuario = req.body.id_usuario;
    const fecha = req.body.fecha;
    const hora_Inicio = req.body.hora_Inicio;
    const hora_fin = req.body.hora_fin;
    const horas = req.body.horas;
    const novedades = req.body.novedades;

    const query = 'INSERT INTO asistencia (id_campaña, id_usuario, fecha, hora_Inicio, hora_fin, horas, novedades) VALUES ( ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [ id_campaña, id_usuario, fecha, hora_Inicio, hora_fin, horas, novedades], (err, result) => {    
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al agregar asistencia' });
        } else {
            res.json({ message: 'Asistencia agregada correctamente' });
        }
    });
}
    
exports.eliminarAsistencia = (req, res) => {
    const id_asistencia = req.params.id;
    const query = 'DELETE FROM asistencia WHERE id_asistencia = ?';
    db.query(query, [id_asistencia], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar asistencia' });
        } else {
            res.json({ message: 'Asistencia eliminada correctamente' });
        }
    });
}

exports.actualizarAsistencia = (req, res) => {
    const id_asistencia = req.body.id_asistencia;
    const id_campaña = req.body.id_campaña;
    const id_usuario = req.body.id_usuario;
    const fecha = req.body.fecha;
    const horas = req.body.horas;

    const query = 'UPDATE asistencias SET id_campaña = ?, id_usuario = ?, fecha = ?, horas = ? WHERE id_asistencia = ?';
    db.query(query, [id_campaña, id_usuario, fecha, horas, id_asistencia], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar asistencia' });
        } else {
            res.json({ message: 'Asistencia actualizada correctamente' });
        }
    });
    }