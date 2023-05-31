import mysql from 'mysql2/promise'

let con: mysql.Connection;

try {
    con = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: parseInt(process.env.DB_PORT || "3306")
    });
} catch (error) {
    console.error("Verifique as credenciais do banco de dados")
    process.exit(1);
}

export default con
