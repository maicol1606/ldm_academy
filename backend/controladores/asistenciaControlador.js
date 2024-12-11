const e = require('express');
const db = require('../config/db');

exports.mostrarAsistencias = (req, res) => {
    db.query('SELECT * FROM asistencia', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener asistencias' });
        } else {
            res.json(result.rows);
        }
    });
};

exports.agregarAsistencia = (req, res) => {
    const id_asistencia = req.body.id_asistencia;
    const id_campaña = req.body.id_campaña;
    const id_usuario = req.body.id_usuario;
    const fecha = req.body.fecha;
    const horas = req.body.horas;

    const query = 'INSERT INTO asistencias (id_asistencia, id_campaña, id_usuario, fecha, horas) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [id_asistencia, id_campaña, id_usuario, fecha, horas], (err, result) => {    
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
    const query = 'DELETE FROM asistencias WHERE id_asistencia = ?';
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