let velha = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  
  let jogador = "X";
  let tabuleiroBloqueado = false;
  
  function jogar(linha, coluna) {
    if (tabuleiroBloqueado || velha[linha][coluna] !== "") return;
    velha[linha][coluna] = jogador;
    atualizarTabuleiro();
    if (!verificarVencedor()) toggleJogador();
  }
  
  function atualizarTabuleiro() {
    for (let linha = 0; linha < 3; linha++) {
      for (let coluna = 0; coluna < 3; coluna++) {
        const celulaAtual = document.getElementById(`cel${linha}${coluna}`);
        celulaAtual.innerHTML = velha[linha][coluna] ? 
                                `<img src='imgs/${velha[linha][coluna].toLowerCase()}.png' width='100'>` : 
                                "";
      }
    }
  }
  
  function toggleJogador() {
    jogador = jogador === "X" ? "O" : "X";
    document.getElementById("jogadorAtual").textContent = `Vez do jogador: ${jogador}`;
  }
  
  function verificarVencedor() {
    const linhas = [...velha, ...transpose(velha), ...diagonais(velha)];
    const vencedor = linhas.find(linha => linha.every(val => val === linha[0] && val !== ""));
  
    if (vencedor) {
      finalizaJogo(`${vencedor[0]} venceu!`);
      return true;
    } else if (velha.every(linha => linha.every(celula => celula !== ""))) {
      finalizaJogo("Empate!");
      return true;
    }
    return false;
  }
  
  function finalizaJogo(resultado) {
    document.getElementById("jogadorAtual").textContent = resultado;
    tabuleiroBloqueado = true;
  }
  
  function reiniciar() {
    velha = velha.map(linha => linha.map(() => ""));
    jogador = "X";
    tabuleiroBloqueado = false;
    atualizarTabuleiro();
    toggleJogador();
  }
  
  // Funções auxiliares
  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  }
  
  function diagonais(matrix) {
    return [
      [matrix[0][0], matrix[1][1], matrix[2][2]],
      [matrix[0][2], matrix[1][1], matrix[2][0]]
    ];
  }
  