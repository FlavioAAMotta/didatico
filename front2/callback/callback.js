let numeroGlobal = 0;
const imprimeEmPortugues = (mensagem) =>{
    console.log("A mensagem é: ", mensagem);
}
const imprimeEmIngles = (mensagem) =>{
    console.log("The message is: ", mensagem);
}

const adicionaNumero = (numero) =>{
    numeroGlobal += numero;
}

const calculoSoma = (numero1, numero2, impressao) => {
    const resultado = numero1 + numero2;
    impressao(resultado);
}

calculoSoma(1,2,imprimeEmIngles)
calculoSoma(1,2,imprimeEmPortugues)
calculoSoma(1,2,adicionaNumero)