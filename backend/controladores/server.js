const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Lista de roles permitidos
const rolesPermitidos = ['admin', 'user', 'moderator'];

// Ruta para leer las notificaciones
const leerNotificaciones = () => {
    try {
        const data = fs.readFileSync('notificaciones.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Si no existe el archivo, devolver un arreglo vacío
    }
};

// Ruta para guardar las notificaciones 
const guardarNotificaciones = (notificaciones) => {
    try {
        fs.writeFileSync('notificaciones.json', JSON.stringify(notificaciones, null, 2), 'utf8');
    } catch (err) {
        console.error('Error al guardar las notificaciones', err);
    }
};

let notificaciones = leerNotificaciones(); // Cargar las notificaciones al inicio

// Ruta para enviar una notificación
app.post('/api/notificaciones', (req, res) => {
    const { mensaje, rol_destino } = req.body;

    if (!mensaje || !rol_destino) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    if (!rolesPermitidos.includes(rol_destino)) {
        return res.status(400).json({ error: 'Rol de destino no permitido' });
    }

    const nuevaNotificacion = {
        id: notificaciones.length + 1,
        mensaje,
        rol_destino,
        leida: false
    };

    notificaciones.push(nuevaNotificacion);
    guardarNotificaciones(notificaciones); // Guardar las notificaciones
    res.status(201).json({ message: 'Notificación enviada', notificacion: nuevaNotificacion });
});

// Ruta para obtener todas las notificaciones
app.get('/api/notificaciones', (req, res) => {
    res.json(notificaciones);
});

// Ruta para marcar como leída
app.put('/api/notificaciones/:id/leida', (req, res) => {
    const id = parseInt(req.params.id);
    const notificacion = notificaciones.find(n => n.id === id);

    if (!notificacion) {
        return res.status(404).json({ error: 'Notificación no encontrada' });
    }

    notificacion.leida = true;
    guardarNotificaciones(notificaciones); // Guardar el cambio
    res.json({ message: 'Notificación marcada como leída', notificacion });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
