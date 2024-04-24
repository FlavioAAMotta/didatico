// Peça para o usuário escrever uma frase e imprima no console a frase alterada, com:

// Todas as letras maiúsculas;
// Na língua do i (substituindo a vogal "o" por "i");
// O tamanho da frase.


const frase = prompt("Digite uma frase");
const fraseMaiuscula = frase.toUpperCase();
const fraseSubstituida = fraseMaiuscula.replaceAll("O","I");

const idade = prompt("Digite sua idade");
let idadeAnoQueVem = Number(idade) + 1;
console.log(`Idade no ano que vem: ${idadeAnoQueVem}`);

console.log(typeof idadeAnoQueVem);
console.log(fraseSubstituida);
console.log(fraseSubstituida.length);