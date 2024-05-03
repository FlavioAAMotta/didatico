// function calcularMedia(notas){
//     let media = 0;
//     for(let i = 0; i < notas.length; i++){
//         media += notas[i]; // -> media = media + notas[i];
//     }
//     media /= notas.length; // -> media = media / notas.length;
//     return media;
// }

// let media = 9;
// console.log("Média: ", media);
// let notas1 = [4,3,5,6,8];
// let media1 = calcularMedia(notas1);
// let notas2 = [9,9,9,9,9,9,9,9];
// let media2 = calcularMedia(notas2);
// let notas3 = [6];
// let media3 = calcularMedia(notas3);
// console.log(media1);
// console.log(media2);
// console.log(media3);



// function pegarMenorTempo(tempos){
//     if(tempos.length == 0){
//         return;
//     }
//     let menorTempo = tempos[0];
//     for(let i = 0; i < tempos.length; i++){
//         if(tempos[i] < menorTempo){
//             menorTempo = tempos[i];
//         }
//     }
//     return menorTempo;
//     console.log("Oi");
// }

// let tempos = []
// let tempos2 = [5,61,33,32,432]
// let tempos3 = [115,6123,3123,32,432]
// console.log(pegarMenorTempo(tempos));
// console.log(pegarMenorTempo(tempos2));
// console.log(pegarMenorTempo(tempos3));

let avaliacoes = [9.8,9.7,3.4,8.8,9.9,8];

function pegarMelhorAvaliacao(avaliacoes){
    let melhorAvaliacao = avaliacoes[0];
    let melhorIndice = 0;
    for(let i = 1; i < avaliacoes.length; i++){
        if(melhorAvaliacao < avaliacoes[i]){
            melhorAvaliacao = avaliacoes[i];
            melhorIndice = i;
        }
    }
    return melhorIndice;
}

console.log(pegarMelhorAvaliacao(avaliacoes));