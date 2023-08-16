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