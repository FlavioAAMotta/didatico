// const imprimeMensagem = (valor) =>{
//     console.log("Seu valor é: ", valor);
// }
// const imprimeMensagemEn = (valor) =>{
//     console.log("Your value is: ", valor);
// }

// const verificaPar = (numero, imprimir) =>{
//     if(numero % 2 === 1){
//         imprimir(numero);
//     }
// }

// verificaPar("Kallebe", imprimeMensagem); //Seu valor é: 2
// verificaPar(2, imprimeMensagemEn); //Your value is: 2
// verificaPar(5, imprimeMensagemEn); //

const pokemons = [
    { nome: "Bulbasaur", tipo: "grama" },
    { nome: "Bellsprout", tipo: "grama" },
    { nome: "Charmander", tipo: "fogo" },
    { nome: "Vulpix", tipo: "fogo" },
    { nome: "Squirtle", tipo: "água" },
    { nome: "Psyduck", tipo: "água" },
]

 const nomeDosPokemons = pokemons.map((pokemon) => {
    return pokemon.nome
 })