import {db} from "../database";
import {newPeriUser, updatePeriUser, periUser} from "../models/user_peri";
import Database from "../models/types";

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