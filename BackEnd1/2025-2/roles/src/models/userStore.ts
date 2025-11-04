import { hashSync } from "bcryptjs";
import { v7 as uuid } from "uuid";


// export type Role = "user" | "editor" | "admin";

export enum Role{
    USER = "user",
    EDITOR = "editor",
    ADMIN = "admin"
}

export type User = {
    id: string;
    email: string;
    passwordHash: string;
    role: Role;
}


const users: User[] = [];


export const createUser = (email: string, password: string, role: Role = Role.USER) => {
    const user: User = { id: uuid(), email, passwordHash: hashSync(password, 8), role };
    users.push(user);
    return user;
};


export const findUserByEmail = (email: string) => users.find(u => u.email === email);
export const findUserById = (id: string) => users.find(u => u.id === id);
export const allUsers = () => users;


// Seed inicial
createUser("user@example.com", "password", Role.USER);
createUser("editor@example.com", "password", Role.EDITOR);
createUser("admin@example.com", "password", Role.ADMIN);