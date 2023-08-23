import { db } from "../database";
import { newPeriPost, updatePeriPost, periPost } from "../models/post_peri";
//import { newPeriUser, updatePeriUser, periUser } from "../models/user_peri";
// import Database from "../models/types";
import { APIError } from "../models/api_error";

export async function getAll() {
  return await db.selectFrom("post_peri").selectAll().execute();
}

// find post by id
export async function getById(id: number) {
  return await db
    .selectFrom('post_peri')
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

// find post by description
export async function getByDescription(description: string) {
  return await db
    .selectFrom("post_peri")
    .where("description", "=", description)
    .selectAll()
    .execute();
}

// create new post
export async function create(post: newPeriPost) {
  const check = await db
    .selectFrom("peri_user")
    .where("id", "=", post.id_peri_user)
    .selectAll()
    .execute();

  if (!check) throw new APIError("User not found: " + console.log(APIError.toString()), { status: 404 });
  else await db.insertInto("post_peri").values(post).execute();
}
