let imprimirPortugues = (valor) =>{
    console.log(`O seu resultado é ${valor}`);
}

let imprimirIngles = (valor) =>{
    console.log(`Your result is ${valor}`);
}

let divisaoPar = (valor, imprimir) =>{
    if(valor % 2 === 0){
        imprimir(valor);
    }
}

divisaoPar(4, imprimirPortugues);
divisaoPar(4, imprimirIngles);