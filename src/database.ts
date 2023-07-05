import mysql from "mysql2/promise";
import { DB } from "./enviroment";

let pool: mysql.Pool;

try {
  pool = mysql.createPool(DB);
} catch (error) {
  console.error("Verifique as credenciais do banco de dados", error);
  process.exit(1);
}

export async function sql<T = unknown>(
  strings: TemplateStringsArray,
  ...values: unknown[]
) {
  const query = strings.join("?");
  const [rows] = await pool.execute(query, values);

  return rows as T[];
}

export default pool;
