const db = require('../config/db');

exports.agregarCampana = (req, res) => {
    const nom_campana = req.body.nom_campana;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    console.log(fecha);
    const cupos = req.body.cupos;
    const id_docente = req.body.id_docente;
    console.log(id_docente);
    const query = 'INSERT INTO campañas ( nom_campaña, descripcion, fecha, cupos, id_docente) VALUES ( ?, ?, ?, ?,?)';
    db.query(query, [nom_campana, descripcion, fecha, cupos, id_docente], (error, results) => {
        if (error) {
            console.error('Error al agregar la campaña:', error);
            res.status(500).json({ error: 'Error al agregar la campaña' });
        } else {
            res.status(200).json({ message: 'Campaña agregada correctamente' });
        }
    });
};

exports.eliminarCampana = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM campañas WHERE id_campaña = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar la campaña:', error);
            res.status(500).json({ error: 'Error al eliminar la campaña' });
        } else {
            res.status(200).json({ message: 'Campaña eliminada correctamente' });
        }
    });
};

exports.actualizarCampana = (req, res) => {
    const id = req.params.id;
    const nom_campana = req.body.nom_campana;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const cupos = req.body.cupos;
    const id_docente = req.body.id_docente;
    const query = 'UPDATE campañas SET nom_campaña = ?, descripcion = ?, fecha = ?, cupos = ?, id_docente = ? WHERE id_campaña = ?';
    db.query(query, [nom_campana, descripcion, fecha, cupos, id_docente, id], (error, results) => {
        if (error) {
            console.error('Error al actualizar la campaña:', error);
            res.status(500).json({ error: 'Error al actualizar la campaña' });
        } else {
            res.status(200).json({ message: 'Campaña actualizada correctamente' });
        }
    });
};

exports.mostrarCampanas = (req, res) => {
    db.query('SELECT * FROM campañas', (error, results) => {
        if (error) {
            console.error('Error al obtener las campañas:', error);
            res.status(500).json({ error: 'Error al obtener las campañas' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.mostrarCampanaNombre = (req, res) => {
    const nom_campana = `%${req.params.nom_campana}%`
    const query = 'SELECT * FROM campañas WHERE nom_campaña like ?';
    db.query(query, [nom_campana], (error, results) => {
        if (error) {
            console.error('Error al obtener la campaña:', error);
            res.status(500).json({ error: 'Error al obtener la campaña' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.mostrarCampanaId = (req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = 'SELECT * FROM campañas WHERE id_campaña = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener la campaña:', error);
            res.status(500).json({ error: 'Error al obtener la campaña' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.eliminarPorCupos = (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE campañas SET estado = 0  WHERE cupos = 0 ';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar la campaña:', error);
            res.status(500).json({ error: 'Error al eliminar la campaña' });
        } else {
            res.status(200).json({ message: 'Campaña eliminada correctamente' });
        }
    });
};