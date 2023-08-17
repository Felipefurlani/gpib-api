import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface periUserTable {
    id: Generated<number>;
    name: ColumnType<string>;

    birth: ColumnType<Date>;
    created_at: ColumnType<Date, string | undefined, never>;
    email: ColumnType<string>;
    password: ColumnType<string>;
    n_followers: ColumnType<number>;
    active: ColumnType<boolean>;

}

export type periUser = Selectable<periUserTable>;
export type newPeriUser = Insertable<periUserTable>;
export type updatePeriUser = Updateable<periUserTable>;

/*
export class UserPeri {
    id: number;
    name: string;
    birth: Date;
    email: string;
    password: string;
    created_at: Date;
    n_followers: number;
    active: boolean;

    constructor(id: number, name: string, birth: Date, email: string, password: string, created_at: Date, n_followers: number, active: boolean) {
        this.id = id;
        this.name = name;
        this.birth = birth;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
        this.n_followers = n_followers;
        this.active = active;
    }

    getAge(): number {
        const now = new Date();
        const age = now.getFullYear() - this.birth.getFullYear();

        if (
            now.getMonth() < this.birth.getMonth() &&
            now.getDay() < this.birth.getDay()
        )
            return age - 1;

        return age;
    }

}
*/