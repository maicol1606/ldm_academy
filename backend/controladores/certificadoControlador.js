const db = require('../config/db');
exports.agregarCertificado = (req, res) => {
    const id_asistencia = req.body.id_asistencia;
    const id_certificado = req.body.id_certificado;
    const observaciones = req.body.observaciones;
    const id_usuario = req.body.id_usuario;
    const query = 'INSERT INTO certificados (id_asistencia, id_certificado, observaciones, id_usuario) VALUES (?, ?, ?, ?)';
    db.query(query, [id_asistencia, id_certificado, observaciones, id_usuario], (error, results) => {
        if (error) {
            console.error('Error al agregar el certificado:', error);
            res.status(500).json({ error: 'Error al agregar el certificado' });
        } else {
            res.status(200).json({ message: 'Certificado agregado correctamente' });
        }
    });
}

exports.mostrarCertificados = (req, res) => {
    db.query('SELECT * FROM certificados', (error, results) => {
        if (error) {
            console.error('Error al obtener los certificados:', error);
            res.status(500).json({ error: 'Error al obtener los certificados' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.eliminarCertificado = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM certificados WHERE id_certificado = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar el certificado:', error);
            res.status(500).json({ error: 'Error al eliminar el certificado' });
        } else {
            res.status(200).json({ message: 'Certificado eliminado correctamente' });
        }
    });
};

exports.actualizarCertificado = (req, res) => {
    const id_certificado = req.params.id_certificado;
    const id_asistencia = req.body.id_asistencia;
    const observaciones = req.body.observaciones;
    const id_usuario = req.body.id_usuario;
    const query = 'UPDATE certificados SET id_asistencia = ?, observaciones = ?, id_usuario = ? WHERE id_certificado = ?';
    db.query(query, [id_asistencia, observaciones, id_usuario, id_certificado], (error, results) => {
        if (error) { 
            console.error('Error al actualizar el certificado:', error);
            res.status(500).json({ error: 'Error al actualizar el certificado' });
        } else {
            res.status(200).json({ message: 'Certificado actualizado correctamente' });
        }
    });
};