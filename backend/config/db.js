const mysql2 = require('mysql2');

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ldm_academy',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, conn) => {
    if (err) {
        console.log(err);
    }
    if (conn) {
        conn.release();
        console.log('Conectado a la base de datos');
    }

})
module.exports = db;