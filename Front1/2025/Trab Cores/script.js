// Elementos do DOM
const rgbDisplay = document.getElementById('rgbDisplay');
const opcoesCores = document.getElementById('opcoesCores');
const mensagemFeedback = document.getElementById('mensagemFeedback');
const novoJogoBtn = document.getElementById('novoJogoBtn');

// Variáveis do jogo
let corAlvo;
const NUMERO_OPCOES = 6;

// Função para gerar cor RGB aleatória
function gerarCorRGBAleatoria() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Função para embaralhar array
function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para verificar a adivinhação
function verificarAdivinhacao(event) {
    const corSelecionada = event.target.style.backgroundColor;
    
    if (corSelecionada === corAlvo) {
        mensagemFeedback.textContent = "Correta!";
        mensagemFeedback.className = "correta";
        // Desabilita todas as caixas após acertar
        const caixas = document.querySelectorAll('.caixa-cor');
        caixas.forEach(caixa => {
            caixa.style.pointerEvents = 'none';
        });
    } else {
        mensagemFeedback.textContent = "Tente novamente!";
        mensagemFeedback.className = "errada";
        // Esconde a caixa errada
        event.target.style.visibility = 'hidden';
    }
}

// Função para iniciar novo jogo
function iniciarNovoJogo() {
    // Limpa o conteúdo anterior
    opcoesCores.innerHTML = '';
    mensagemFeedback.textContent = '';
    mensagemFeedback.className = '';

    // Gera a cor alvo
    corAlvo = gerarCorRGBAleatoria();
    rgbDisplay.textContent = corAlvo;

    // Cria array de cores
    const coresOpcoes = [corAlvo];
    
    // Adiciona cores aleatórias até ter o número desejado de opções
    while (coresOpcoes.length < NUMERO_OPCOES) {
        const novaCor = gerarCorRGBAleatoria();
        if (!coresOpcoes.includes(novaCor)) {
            coresOpcoes.push(novaCor);
        }
    }

    // Embaralha as cores
    embaralharArray(coresOpcoes);

    // Cria as caixas de cores
    coresOpcoes.forEach(cor => {
        const caixaCor = document.createElement('div');
        caixaCor.className = 'caixa-cor';
        caixaCor.style.backgroundColor = cor;
        caixaCor.addEventListener('click', verificarAdivinhacao);
        opcoesCores.appendChild(caixaCor);
    });
}

// Adiciona evento ao botão de novo jogo
novoJogoBtn.addEventListener('click', iniciarNovoJogo);

// Inicia o jogo quando a página carregar
iniciarNovoJogo();