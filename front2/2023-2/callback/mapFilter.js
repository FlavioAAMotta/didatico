//aplicar funcao de map para gerar vetor de strings
// Exemplo:
// const vetor = [1,22,3];
// [numero 1,numero 22,numero 3]

const numeros = [1, 22, 3, 5, 6, 4];

let numerosEmString = numeros.map((numero, indice, vetorCompleto) => {
    return `O elemento ${indice} é ${numero}`;
}
)

// console.log(numeros);
// console.log(numerosEmString);

let numerosPares = numeros.filter((numero) => {
    return numero % 2 == 0;
}
)
let numeroMaioresQueDez = numeros.filter((numero) => {
    return numero > 10;
}
)
console.log(numeros)
console.log(numerosPares)
console.log(numeroMaioresQueDez)