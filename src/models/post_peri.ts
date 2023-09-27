import {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable
} from "kysely";

export interface periPostTable {
  id: Generated<number>;
  title: ColumnType<string>;
  description: ColumnType<string>;
  created_at: ColumnType<string | undefined, never>;
  active: ColumnType<boolean>;
  id_peri_user: ColumnType<number>;
  like: ColumnType<Number>
}

export type periPost = Selectable<periPostTable>;
export type newPeriPost = Insertable<periPostTable>;
export type updatePeriPost = Updateable<periPostTable>;
