import { periPostTable } from "./post_peri";
import { periUserTable } from "./user_peri";

export default interface Database {
    peri_user: periUserTable;
    post_peri: periPostTable;
}