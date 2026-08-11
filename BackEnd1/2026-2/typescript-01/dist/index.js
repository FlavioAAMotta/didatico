"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["NORMAL"] = 1] = "NORMAL";
})(Role || (Role = {}));
const usuarios = [];
const usuario1 = {
    name: "Fravo",
    age: 22,
    email: 'flavio@flavio',
    role: Role.ADMIN
};
const usuario2 = {
    name: "Fravio",
    age: 23,
    email: 'flrvio@flavio',
    role: Role.NORMAL
};
usuarios.push(usuario1);
usuarios.push(usuario2);
console.log(usuarios);
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
//# sourceMappingURL=index.js.map