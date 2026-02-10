// Escreva uma função que dado dois números retorne um obj com as propriedades
// Maior
// Maior divisível por menor
// Diferença

// Ex -> 14, 7 = 
// {
//     maior: 14,
//     divisivel: true,
//     diferenca: 7
// }

const propriedadesNumeros = (num1, num2) =>{
    let maior = num1;
    let menor = num2;
    let divisivel = false;
    let diferenca = 0;
    if(maior < num2){
        maior = num2;
        menor = num1;
    }
    if(maior % menor == 0){
        divisivel = true;
    }
    diferenca = maior - menor;
    // console.log(maior, divisivel, diferenca) //-> 14, true, 7
    return {
        maior: maior, 
        divisivel: divisivel, 
        diferenca: diferenca
    }
}

const retorno = propriedadesNumeros(14,7);

console.log(retorno.maior);