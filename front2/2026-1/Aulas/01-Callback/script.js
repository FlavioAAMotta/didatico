const imprimeMensagem = (numero) =>{
    console.log(`O resultado da sua operação é: ${numero}`);
}

const imprimeMensagemEN = (numero) =>{
    console.log(`The result of your operation is: ${numero}`);
}

const verificaPar = (numero, imprimir) =>{
    if(numero % 2 == 0){
        const resultado = numero/2;
        imprimir(resultado);
    }
}

verificaPar(4,imprimeMensagem);
verificaPar(3,imprimeMensagem);
verificaPar(10,imprimeMensagemEN);