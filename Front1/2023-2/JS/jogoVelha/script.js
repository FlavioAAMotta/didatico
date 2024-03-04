let jogador = 'X'

let divs = document.querySelectorAll('div');
for(let i = 0; i < divs.length; i++){
    divs[i].addEventListener('click', () =>{
        jogar(i);
    })
}

function jogar(i){
    let celula = document.getElementById(i);
    if(celula.textContent != ''){
        return;
    }
    celula.textContent = jogador;
    if(jogador == 'X'){
        jogador = 'O';
    }else{
        jogador = 'X';
    }
}