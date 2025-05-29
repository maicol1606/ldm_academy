const express = require('express');
const db = require('./config/db');
const path = require('path'); // 🔧 Importamos path para construir la ruta de forma segura
const app = express();
const port = 3000;

const estudiantesRutas = require('./rutas/estudiantes');
const docentesRutas = require('./rutas/docentes');
const campanasRutas = require('./rutas/campañas');
const certificadosRutas = require('./rutas/certificados');
const authRutas = require('./rutas/auth');
const postulacionRutas = require('./rutas/postulacion');
const asistenciaRutas = require('./rutas/asistencia');
const estadísticasRutas = require('./rutas/estadisticas');
const rutasNotificaciones = require('./rutas/notificaciones');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// 🔧 Agregado: servir la carpeta de imágenes de campañas públicamente
app.use('/img/campanas', express.static(path.join(__dirname, 'public', 'img', 'campañas')));

app.use('/imgmovil/campanas', express.static(path.join(__dirname, '../movil/ldm_academy/public/img/campañas')));

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor backend!');
});

app.use('/api/estudiantes', estudiantesRutas);
app.use('/api/docentes', docentesRutas);
app.use('/api/campanas', campanasRutas);
app.use('/api/certificados', certificadosRutas);
app.use('/api/auth', authRutas);
app.use('/api/postulacion', postulacionRutas);
app.use('/api/asistencia', asistenciaRutas);
app.use('/api', estadísticasRutas);
app.use('/api', rutasNotificaciones);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
