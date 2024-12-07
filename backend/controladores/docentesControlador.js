const db = require('../config/db');

exports.obtenerDocentes = (req, res) => {
    db.query('SELECT * FROM usuarios where id_rol = 3 and estado = 1', (error, results) => {
        if (error) {
            console.error('Error al obtener los docentes:', error);
            res.status(500).json({ error: 'Error al obtener los docentes' });
        } else {
            res.status(200).send(results);
        }
    });
}