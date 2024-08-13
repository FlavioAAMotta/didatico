// let imprimePtBr = (numero) => {
//     console.log("Seu valor é:", numero);
// }

// let imprimeEn = (number) => {
//     console.log("Your value is:", number);
// }

// let verificaPar = (valor, imprimir) =>{
//     if(valor % 2 === 0){
//         imprimir(valor);
//     }
// }

// verificaPar(4, imprimeEn); //
// verificaPar(8, imprimePtBr);
// verificaPar(7, imprimePtBr);
// verificaPar(10, imprimeEn);


// const pokemons = [
//     { nome: "Bulbasaur", tipo: "grama" },
//     { nome: "Bellsprout", tipo: "grama" },
//     { nome: "Charmander", tipo: "fogo" },
//     { nome: "Vulpix", tipo: "fogo" },
//     { nome: "Squirtle", tipo: "água" },
//     { nome: "Psyduck", tipo: "água" },
//  ]

//  const extrairNomes = (pokemon) =>{
//     return pokemon.nome;
//  }

//  const nomesExtraidos = pokemons.map(extrairNomes);
 
//  const nomeDosPokemons = pokemons.map((pokemon, indice, array) => {
//     return pokemon.nome
//  })
 

numeros = [9,6,5,3,45,3,23,55];
numerosString = numeros.map((numero, indice) =>{
    return `O elemento ${indice} é ${numero}`;
})

console.log(numerosString);