const db = require('../config/db');

exports.mostrarPostulaciones = (req, res) => {
    db.query('SELECT * FROM postulaciones', (error, results) => {
        if (error) {
            console.error('Error al obtener las postulaciones:', error);
            res.status(500).json({ error: 'Error al obtener las postulaciones' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.mostrarPostulacionId = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM postulaciones WHERE id_postulacion = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la postulación:', error);
            res.status(500).json({ error: 'Error al obtener la postulación' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.agregarPostulacion = (req, res) => {
    const id_usuario = req.body.id_usuario;
    const id_campaña = req.body.id_campaña;
    const aceptacion = req.body.aceptacion;
    const query = 'INSERT INTO postulaciones (id_usuario, id_campaña, aceptacion) VALUES (?, ?, ?)';
    db.query(query, [id_usuario, id_campaña, aceptacion], (error, results) => {
        if (error) {
            console.error('Error al agregar la postulación:', error);
            res.status(500).json({ error: 'Error al agregar la postulación' });
        } else {
            res.status(200).json({ message: 'Postulación agregada correctamente' });
        }
    });
}

exports.actualizarPostulacion = (req, res) => {
    const id_usuario = req.body.id_usuario;
    const id_campaña = req.body.id_campaña;
    const aceptacion = req.body.aceptacion;
    const id_postulacion = req.params.id_postulacion;
    const query = 'UPDATE postulaciones SET id_usuario = ?, id_campaña = ?, aceptacion = ? WHERE id_postulacion = ?';
    db.query(query, [id_usuario, id_campaña, aceptacion, id_postulacion], (error, results) => {
        if (error) {
            console.error('Error al actualizar la postulación:', error);
            res.status(500).json({ error: 'Error al actualizar la postulación' });
        } else {
            res.status(200).json({ message: 'Postulación actualizada correctamente' });
        }
    });
}

exports.eliminarPostulacion = (req, res) => {
    const id_postulacion = req.params.id_postulacion;
    const query = 'DELETE FROM postulaciones WHERE id_postulacion = ?';
    db.query(query, [id_postulacion], (error, results) => {
        if (error) {
            console.error('Error al eliminar la postulación:', error);
            res.status(500).json({ error: 'Error al eliminar la postulación' });
        } else {
            res.status(200).json({ message: 'Postulación eliminada correctamente' });
        }
    });
}