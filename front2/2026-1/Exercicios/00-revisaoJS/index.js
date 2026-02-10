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

const recuperarNumeros = (vetor) =>{
    if(vetor.length <= 1){
        return;
    }
    const ordenado = vetor.sort((a, b)=> a - b);
    const segundoMenor = ordenado[1];
    const segundoMaior = ordenado[ordenado.length-2];
    return [segundoMaior, segundoMenor];
}

const vetor = [5,1,3,6,2,8,9];
console.log(recuperarNumeros(vetor))


const verificarTipoTriangulo = (ladoA, ladoB, ladoC) =>{
    if(ladoA == ladoB && ladoA == ladoC){
        return "Equilatero";
    }else if(ladoA != ladoB && ladoA != ladoC && ladoB != ladoC){
        return "Escaleno";
    }else{
        return "Isóceles"
    }
}