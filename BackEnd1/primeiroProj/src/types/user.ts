enum Role{
    ADMIN = "Admin",
    NORMAL = "Normal",
    CLIENTE = "Cliente"
}

type Person={
    id:string,
    name:string,
    age:number
}

type UserAccount = {
    email:string,
    birthDate: number | string
    password:string,
    adminPermission : false
    role?: Role
}
type AdminAccount = {
    email:string,
    password:string,
    adminPermission : true
    role?: Role
}

type AdminInfo = Person & AdminAccount
type UserInfo = Person & UserAccount

const flavio: AdminInfo ={
    email: "flavio@flavio",
    password: "flavio",
    adminPermission: true,
    role: Role.ADMIN
}