import mysql from 'mysql2/promise'
import { DB } from './enviroment';

let con: mysql.Connection;

try {
    con = await mysql.createConnection(DB);
} catch (error) {
    console.error("Verifique as credenciais do banco de dados", error)
    process.exit(1);
}

export default con
