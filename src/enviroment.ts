import dotenv from "dotenv";
import { PoolOptions } from "mysql2/promise";

dotenv.config();

export const PORT = Number(process.env.PORT) || 3000;

export const DB: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || "3306"),
  charset: "utf8mb4"
};

console.log(DB);
