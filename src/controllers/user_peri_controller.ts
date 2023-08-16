import { sql } from "../database";
import { APIError } from "../models/api_error";
import { UserPeri } from "../models/user_peri";

export async function getUserPeri(id: number) {
    const userPeri = await sql`SELECT * FROM peri_user WHERE id = ${id}`;

    if (!userPeri) {
        throw new APIError("User not found", { status: 404 }); 
    }
    return userPeri;
}

export async function createUserPeri(userPeri: UserPeri) {
    try {
        const userPeriCreated = await sql`
        INSERT INTO peri_user
            (name, birth, email, password, created_at, n_followers, active)
        VALUES
            (${userPeri.name}, ${userPeri.birth}, ${userPeri.email}, ${userPeri.password}, ${userPeri.created_at}, ${userPeri.n_followers}, ${userPeri.active})
        RETURNING *
    `;

    return userPeriCreated;
    } catch (e) {
        throw new APIError("Error creating user", { status: 500 });
    }   
}