const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registar = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);
    const telefono = req.body.telefono;
    const curso = req.body.curso;
    const query1 = 'SELECT * FROM usuarios WHERE correo = ?';

    db.query(query1, [correo], (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send({ error: 'Error al obtener el usuario' });
        } else if (results.length > 0) {
            res.status(400).send({ title: 'El correo ya está registrado' });
        }
        else {
            const query = 'INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, curso , id_rol) VALUES ( ?, ?, ?, ?, ?, ?,2)';
            db.query(query, [nombre, apellido, correo, contrasenaEncriptada, telefono, curso], (error, results) => {
                if (error) {
                    console.error('Error al registrar el usuario:', error);
                    res.status(500).send({ error: 'Error al registrar el usuario' });
                } else {
                    res.status(200).send({ title: 'Registro exitoso', message: 'Usuario registrado correctamente' });
                }
            });
        }
    });

}

exports.login = (req, res) => {
    const correo = req.body.correo;
    const contrasena = req.body.contrasena;
    const query = 'SELECT * FROM usuarios WHERE correo = ? and estado = 1';

    db.query(query, [correo], (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send({ error: 'Error al obtener el usuario' });
        } else if (results.length === 0) {
            res.status(401).send({ title: 'Credenciales incorrectas' });
        } else {
            const usuario = results[0];
            const contrasenaValida = bcrypt.compareSync(contrasena, usuario.contrasena);

            if (contrasenaValida) {
                const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.id_rol }, 'secret', { expiresIn: '3h' });
                res.status(200).send({ token: token, title: 'Inicio de sesión exitoso', rol : usuario.id_rol });
            } else {
                res.status(401).send({ error: 'Credenciales incorrectas' });
            }
        }
    });
}