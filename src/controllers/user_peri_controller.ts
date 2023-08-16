import { sql } from "../database";

export async function getUserPeri(id: number) {
    const userPeri = await sql`SELECT * FROM peri_user WHERE id = ${id}`;

    if (!userPeri) {
        throw new Error("User Peri not found"); 
    }

    return userPeri;
}