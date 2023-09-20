import { db } from "../database";
import { newPeriUser, updatePeriUser, periUser } from "../models/user_peri";
import Database from "../models/types";
import { APIError } from "../models/api_error";
import { sql } from "kysely";

export async function getById(id: number) {
  return await db.selectFrom('peri_user')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst()
}

// return all users
export async function getAll() {
  return await db.selectFrom('peri_user')
    .selectAll()
    .execute()
}

export async function login(email: string, password: string): Promise<boolean> {
  const check = await db.selectFrom('peri_user')
    .where('email', '=', email)
    .where('password', '=', password)
    .selectAll()
    .executeTakeFirst()

  if (!check) return false;
  else return true;
}

export async function create(user: newPeriUser) {
  const check = await db.selectFrom('peri_user')
    .where('email', '=', user.email)
    .selectAll()
    .executeTakeFirst()

  if (check) throw new APIError("User already exists", { status: 409 });

  await db.insertInto('peri_user')
    .values(user)
    .execute();
}

export async function deleteById(id: number) {
  if (!await getById(id)) throw new APIError("User not found", { status: 404 });

  await db.updateTable('peri_user')
    .set({ active: false })
    .where('id', '=', id)
    .execute();
}

export async function count() {
  // get all ocurrencies of function getall
  const users = await getAll();
  // return the length of the array
  return users.length.toString();
}