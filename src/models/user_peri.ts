import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface periUserTable {
    id: Generated<number>;
    name: ColumnType<string>;
    birth: ColumnType<string>;
    created_at: ColumnType<Date, string | undefined, never>;
    email: ColumnType<string>;
    password: ColumnType<string>;
    n_followers: ColumnType<number>;
    active: ColumnType<boolean>;
}

export type periUser = Selectable<periUserTable>;
export type newPeriUser = Insertable<periUserTable>;
export type updatePeriUser = Updateable<periUserTable>;
