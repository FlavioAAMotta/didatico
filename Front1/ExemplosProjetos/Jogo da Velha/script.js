let velha = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let jogador = "X";
let tabuleiroBloqueado = false;

function jogar(linha, coluna) {
  if (tabuleiroBloqueado) {
    alert("O jogo já acabou!");
    return;
  }
  if (velha[linha][coluna] == "") {
    velha[linha][coluna] = jogador;
  } else {
    alert("Jogada inválida!");
    return;
  }
  atualizarTabuleiro();
  atualizarJogadorAtual();
  verificarVencedor();
}

function atualizarTabuleiro() {
  for (let linha = 0; linha < 3; linha++) {
    for (let coluna = 0; coluna < 3; coluna++) {
      const imgX = document.createElement("img");
      imgX.src = "imgs/x.png";
      imgX.width = 100;
      const imgO = document.createElement("img");
      imgO.src = "imgs/O.png";
      imgO.width = 100;
      const celulaAtual = document.getElementById("cel" + linha + coluna);
      if (velha[linha][coluna] == "X") {
        celulaAtual.innerHTML = "";
        celulaAtual.appendChild(imgX);
      } else {
        if (velha[linha][coluna] == "O") {
          celulaAtual.innerHTML = "";
          celulaAtual.appendChild(imgO);
        } else {
          celulaAtual.innerHTML = "";
        }
      }
    }
  }
}

function atualizarJogadorAtual() {
  const jogadorAtual = document.getElementById("jogadorAtual");
  if (jogador == "X") {
    jogador = "O";
  } else {
    jogador = "X";
  }
  jogadorAtual.innerHTML = `Vez do jogador: ${jogador}`;
}

function verificarVencedor() {
  let vencedor = "";
  if (
    (velha[0][0] == velha[0][1] &&
      velha[0][1] == velha[0][2] &&
      velha[0][0] != "") ||
    (velha[1][0] == velha[1][1] &&
      velha[1][1] == velha[1][2] &&
      velha[1][0] != "") ||
    (velha[2][0] == velha[2][1] &&
      velha[2][1] == velha[2][2] &&
      velha[2][0] != "") ||
    (velha[0][0] == velha[1][0] &&
      velha[1][0] == velha[2][0] &&
      velha[0][0] != "") ||
    (velha[0][1] == velha[1][1] &&
      velha[1][1] == velha[2][1] &&
      velha[0][1] != "") ||
    (velha[0][2] == velha[1][2] &&
      velha[1][2] == velha[2][2] &&
      velha[0][2] != "") ||
    (velha[0][0] == velha[1][1] &&
      velha[1][1] == velha[2][2] &&
      velha[0][0] != "") ||
    (velha[0][2] == velha[1][1] &&
      velha[1][1] == velha[2][0] &&
      velha[0][2] != "")
  ) {
    atualizarJogadorAtual();
    vencedor = jogador;
    tabuleiroBloqueado = true;
  } else {
    let empate = true;
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 3; coluna++) {
        if (velha[linha][coluna] == "") {
          empate = false;
        }
      }
    }
    if (empate) {
      vencedor = "Empate";
    }
  }
  if (vencedor != "") {
    const jogadorAtual = document.getElementById("jogadorAtual");
    if (vencedor == "Empate") {
      jogadorAtual.textContent = "Empate!";
    } else {
      jogadorAtual.textContent = vencedor + " venceu!";
    }
  }
}

function reiniciar() {
  velha = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  tabuleiroBloqueado = false;
  jogador = "O";
  atualizarTabuleiro();
  atualizarJogadorAtual();
}
