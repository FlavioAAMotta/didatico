type Person ={
    name: string;
    email: string;
    age:number;
}

type AdminAccount ={
    username: string;
    password: string;
    role: "ADMIN";
    permissions: string[];
}
type NormalAccount ={
    username: string;
    password: string;
    role: "NORMAL";
}

enum Role{
    ADMIN,
    NORMAL
}

type User = Person & {role: Role}

const usuarios: User[] = []

const usuario1: User ={
    name: "Fravo",
    age: 22,
    email: 'flavio@flavio',
    role: Role.ADMIN
}
const usuario2: User ={
    name: "Fravio",
    age: 23,
    email: 'flrvio@flavio',
    role: Role.NORMAL
}

usuarios.push(usuario1);
usuarios.push(usuario2);

console.log(usuarios)
// type carro = {
//     nome: string;
//     marca: string;
// }

// const frota: carro[] = [
//     {
//         nome: "Yaris",
//         marca: "Toyota"
//     },
//     {
//         nome: "Corolla",
//         marca: "Toyota"
//     },
//     {
//         nome: "Gol",
//         marca: "VW"
//     },
//     {
//         nome: "Onix",
//         marca: "GM"
//     },
// ]

// function buscarCarroPorMarca(carros: carro[], marca?: string): carro[] {
//     const frotaFiltrada = carros.filter((carro) => { return carro.marca === marca })
//     return frotaFiltrada;
// }
// console.log(`Filtrando toyota de` )
// console.log(frota)
// console.log(buscarCarroPorMarca(frota, "Toyota"));
// console.log(buscarCarroPorMarca(frota, "VW"));
// console.log(buscarCarroPorMarca(frota, "Fiat"));