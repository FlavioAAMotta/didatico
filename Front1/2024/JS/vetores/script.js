// //                       0       1     2
// let listaDeCompras = ["Alface","Pão","Café"];
// console.log(listaDeCompras[1]); //Pão

// listaDeCompras[1] = "Pão de Queijo";//Pão -> Pão de Queijo
// console.log(`alterado ${listaDeCompras[1]}`); //Pão de Queijo


// // Crie um array com pelo menos 5 raças de cachorro
// // Peça para o usuário inserir um número de 1 a 5
// // Imprima no console a raça correspondente à posição escolhida pelo usuário

// let racas = ["Poodle", "Maltês", "Pitbull", "Beagle", "Chihuahua"];
// let numeroDigitado = Number(prompt("Digite um número de 1 a 5"));
// numeroDigitado = numeroDigitado - 1;
// alert(racas[numeroDigitado]);

// let numeros = ["Arroz", "Feijão", "Ovo"];
// numeros.push("Pão", "Queijo", "Alface");

// Quero perguntar ao usuario um numero, ao digitá-lo, vou adicionar o número ao vetor

// numeros.push(Number(prompt("Digite um número")));

// let tamanhoVetor = numeros.length;

// for (let i = 0; i < tamanhoVetor; i++) {
//     console.log(numeros[i]);
// }

let valores = [4,5,3,2,9,1]; // 22

///Escreva uma função que recebe um vetor e retornar ele invertido

function inverteVetor(vetor){
    let intermediaria;
    let meioVetor = Math.floor(vetor.length / 2);

    for(let i = 0; i < meioVetor; i++){
        intermediaria = vetor[i];
        vetor[i] = vetor[vetor.length-1-i];
        vetor[vetor.length-1-i] = intermediaria;
    }
    return vetor;
}

console.log(inverteVetor(valores));