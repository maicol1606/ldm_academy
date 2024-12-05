const express = require('express');
const db = require('./config/db');
const app = express();
const port = 3000; // Puedes cambiar el puerto si lo deseas

app.get('/', (req, res) => {
    res.send('¡Hola desde el servidor backend!');
});
app.get('/usuarios', (req, res) => {
    db.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        } else {
            res.status(200).send(results);
        }
    });

})
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});