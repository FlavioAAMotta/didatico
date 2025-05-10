// // 1. Escreva um programa que avalie se um número é positivo, negativo ou zero.

// let numero = prompt("Digite um numero");
// // let numero = Number(numeroEmString);

// if(numero < 0){
//     alert("O numero " + numero + "é negativo");
// }else if( numero === "0"){
//     alert('Zero');
// }else{
//     alert(`O número ${numero} é positivo`);
// }

// 3. Use um loop for para imprimir os primeiros 50 números ímpares.

let i = 0;

// while(i < 100){
//     if(i % 2 === 1){
//         console.log(i++);
//         // console.log(++i);
//     }else{
//         i++;
//     }
// }


// for(let i = 0; i < 100; i++){
//     if(i % 2 === 0){
//         continue;
//     }
//     console.log(i);
//     // Quando for par ele nunca vai chegar aqui
// }

function retornarMaiorNumero(numeroUm, numeroDois){
    if(numeroUm > numeroDois){
        return numeroUm;
    }else{
        return numeroDois;
    }
}

let maiorNumero = retornarMaiorNumero(6,8);
console.log(maiorNumero);

let numeroUsuario = prompt("Digite um numero");
numeroUsuario = Number(numeroUsuario);
let numeroDoisUsuario = Number(prompt("Digite um numero"));

console.log(retornarMaiorNumero(numeroDoisUsuario, numeroUsuario));