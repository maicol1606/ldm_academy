const mysql2 = require("mysql2");

// Crear el pool de conexiones
const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,    // Esperar por conexiones disponibles
    connectionLimit: 10,         // Limitar el número de conexiones (ajusta este valor según tu necesidad)
    queueLimit: 0               // Número de conexiones que pueden esperar en la cola
});

// Probar la conexión utilizando el pool (opcional)
db.getConnection((err, connection) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database successfully");
    connection.release(); // Liberar la conexión después de la prueba
});

// Exportar el pool de conexiones para usarlo en otras partes de la aplicación
module.exports = db;
