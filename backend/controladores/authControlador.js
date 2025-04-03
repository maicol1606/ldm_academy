const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "lulo06817@gmail.com",
        pass: "jeof wqpx wbsa odny"
    }
});

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
                const token = jwt.sign({ id: usuario.id_usuario, rol: usuario.id_rol }, secret, { expiresIn: '3h' });
                res.status(200).send({ token: token, title: 'Inicio de sesión exitoso', rol: usuario.id_rol });
            } else {
                res.status(401).send({ error: 'Credenciales incorrectas' });
            }
        }
    });
}
exports.validarToken = (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).send('Token no proporcionado');
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.error("Error al verificar el token:", err);
            return res.status(401).send('Error al verificar el token');
        }

        req.user = decoded;
        res.send({ rol: decoded.rol });
    });
};
exports.enviarCodigo = (req, res) => {
    const correo = req.body.correo;
    const query = 'SELECT * FROM usuarios WHERE correo = ? and estado = 1';

    db.query(query, [correo], (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send({ error: 'Error al obtener el usuario' });
        } else {
            const usuario = results[0];
            const codigo = Math.floor(Math.random() * 9000) + 1000;
            // Enviar el correo con el código de verificación
            const emailOptions = {
                from: "lulo06817@gmail.com",
                to: "" + correo,   
                subject: "Recuperar contraseña",
                html: `
                <div class="container" style="background-color: #1805A6FF; color: #fff; padding: 80px;">
                    <div class="imagen" style="text-align: center;">
                    </div>
                    <h1>Recuperación de Contraseña</h1>
                    <p style="font-size: 25px;">Tu código de verificación es:</p>
                    <h2 style="font-size: 40px; font-weight: bold; color: #FFFFFF;">${codigo}</h2>
                    <p>Por favor, ingrésalo en el formulario de recuperación de contraseña.</p>
                    <p>Este código caducará en 1 hora.</p>
                    <p>Si no solicitaste este cambio, ignora este mensaje.</p>
                    <p>Gracias,</p>
                    <p>El equipo de soporte</p>
                </div>
                `,
            }
            transporter.sendMail(emailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
                db.query('UPDATE usuarios SET codigo_verificacion = ? WHERE correo = ?', [codigo, usuario.correo], (error, results) => {
                    if (error) {
                        console.error('Error al actualizar el usuario:', error);
                        res.status(500).send({ error: 'Error al actualizar el usuario' });
                    } else {
                        console.log(results)
                        console.log(`Correo: ${correo}, Codigo: ${codigo}`);
                        res.status(200).send({ title: 'Correo enviado con exito' });
                    }
                });
            })
        }
    })
}

exports.recuperar = (req, res) => {
    const correo = req.body.correo;
    const codigo = req.body.codigo;
    const contrasena = req.body.contrasena;

    const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);

    db.query('SELECT * FROM usuarios WHERE correo = ? and codigo_verificacion = ?', [correo, codigo], (error, results) => {
        if (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).send({ error: 'Error al obtener el usuario' });
        } else {
            if (results.length === 0) {
                res.status(400).send({ error: 'Correo o codigo incorrecto' });
            } else {
                db.query('UPDATE usuarios SET contrasena = ? WHERE correo = ?', [contrasenaEncriptada, correo], (error, results) => {
                    if (error) {
                        console.error('Error al actualizar el usuario:', error);
                        res.status(500).send({ error: 'Error al actualizar el usuario' });
                    } else {
                        res.status(200).send({ title: 'Contraseña actualizada con exito' });
                    }
                });
            }
        }
    }
)}