const db = require('../config/db');

exports.obtenerEstudiantes = (req, res) => {
    db.query('SELECT * FROM usuarios where id_rol = 2 and estado = 1', (error, results) => {
        if (error) {
            console.error('Error al obtener los estudiantes:', error);
            res.status(500).json({ error: 'Error al obtener los estudiantes' });
        } else {
            res.status(200).send(results);
        }
    });
};

exports.actualizarEstudiante = (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const telefono = req.body.telefono;
    const curso = req.body.curso;
    const qestudiante = 'SELECT * FROM usuarios WHERE id_usuario = ?';

    db.query(qestudiante, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener el estudiante:', error);
            res.status(500).json({ error: 'Error al obtener el estudiante' });
        }

        else if (results.length === 0) {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        const estudianteActual = results[0];
        const nombreActual = nombre || estudianteActual.nombre;
        const apellidoActual = apellido || estudianteActual.apellido;
        const correoActual = correo || estudianteActual.correo;
        const telefonoActual = telefono || estudianteActual.telefono;
        const cursoActual = curso || estudianteActual.curso;

        const query = 'UPDATE usuarios SET nombre = ?, apellido = ?, correo = ?, telefono = ?, curso = ? WHERE id_usuario = ?';

        db.query(query, [nombreActual, apellidoActual, correoActual, telefonoActual, cursoActual, id], (error, results) => {
            if (error) {
                console.error('Error al actualizar el estudiante:', error);
                res.status(500).json({ error: 'Error al actualizar el estudiante' });
            } else {
                res.status(200).json({ message: 'Estudiante actualizado correctamente' });
            }
        });

    })

}

exports.eliminarEstudiante = (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE usuarios SET estado = 0 WHERE id_usuario = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al eliminar el estudiante:', error);
            res.status(500).json({ error: 'Error al eliminar el estudiante' });
        } else {
            res.status(200).json({ message: 'Estudiante eliminado correctamente' });
        }
    });
}

exports.restaurarEstudiante = (req, res) => {
    const id = req.params.id;
    const query = 'UPDATE usuarios SET estado = 1 WHERE id_usuario = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al restaurar el estudiante:', error);
            res.status(500).json({ error: 'Error al restaurar el estudiante' });
        } else {
            res.status(200).json({ message: 'Estudiante restaurado correctamente' });
        }
    });
}

exports.conteoEstudiantes = (req, res) => {
    const query = 'SELECT COUNT(*) as total FROM usuarios WHERE id_rol = 2 and estado = 1';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener el conteo de estudiantes:', error);
            res.status(500).json({ error: 'Error al obtener el conteo de estudiantes' });
        } else {
            res.status(200).json({ total: results[0].total });
        }
    });
}

exports.mostrarHorasEstudiante = (req, res) => {
    const id = req.params.id;
    const fecha = req.params.fecha; 
    const query = 'SELECT * FROM asistencia WHERE id_usuario = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener las horas del estudiante:', error);
            res.status(500).json({ error: 'Error al obtener las horas del estudiante' });
        } else {
            res.status(200).send(results);
        }
    });
}