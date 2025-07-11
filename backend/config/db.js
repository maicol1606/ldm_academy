const mysql2 = require("mysql2");

const db = mysql2.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

db.getConnection((err, conn) => {
    if (err) {
        console.error("Error connecting to database:", err);
    }
    if (conn) {
        conn.release();
        console.log("Connected to database successfully");
    }
});

module.exports = db;
