const db = require('../config/db');

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

exports.
exports