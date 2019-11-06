import { Authority } from "./Authority";

export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    birthday: Date;
    gender: string;
    height: number;
    weight: number;
    authorities: Array<Authority>;
    username:string;
    stringAuthorities:string;
}