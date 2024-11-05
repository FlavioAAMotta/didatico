export type user = {
    id: string,
    name: string,
    nickname: string,
    email: string,
    password: string,
    role: userRole
}

export enum userRole{
    ADMIN="ADMIN",
    USER="USER"
}