// COLOQUE AQUI OS NOMES DOS ALUNOS DO GRUPO

// Elementos do DOM
// TODO: Buscar o elemento que exibirá o código RGB da cor alvo
// TODO: Buscar o container que conterá as opções de cores para escolha
// TODO: Buscar o elemento que mostrará mensagens de feedback ao jogador
// TODO: Buscar o botão que permitirá iniciar um novo jogo

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
        // TODO: Atualizar o texto da mensagem de feedback para "Correta!"
        // TODO: Definir a classe CSS da mensagem de feedback como "correta"

        // TODO: Buscar todos os elementos com a classe 'caixa-cor'
        for (let i = 0; i < caixas.length; i++) {
            caixas[i].style.pointerEvents = 'none';
        }
    } else {
        // TODO: Atualizar o texto da mensagem de feedback para "Tente novamente!"
        // TODO: Definir a classe CSS da mensagem de feedback como "errada"

        // TODO: Esconder a caixa errada
        event.target.style.visibility = 'hidden';
    }
}

function gerarCoresAleatorias(coresOpcoes) {
    while (coresOpcoes.length < NUMERO_OPCOES) {
        const novaCor = gerarCorRGBAleatoria();
        if (!coresOpcoes.includes(novaCor)) {
            coresOpcoes.push(novaCor);
        }
    }
}

// Função para iniciar novo jogo
function iniciarNovoJogo() {
    // TODO: Limpar o conteúdo do elemento opcoesCores
    // TODO: Limpar o texto do elemento mensagemFeedback
    // TODO: Limpar as classes CSS do elemento mensagemFeedback

    // Gera a cor alvo
    corAlvo = gerarCorRGBAleatoria();
    rgbDisplay.textContent = corAlvo;

    // Cria array de cores
    const coresOpcoes = [corAlvo];
    
    gerarCoresAleatorias(coresOpcoes);

    // Embaralha as cores
    embaralharArray(coresOpcoes);

    // Cria as caixas de cores
    for (let i = 0; i < coresOpcoes.length; i++) {
        // TODO: Criar um novo elemento div para representar uma caixa de cor
        // TODO: Definir a classe CSS 'caixa-cor' para o elemento criado
        // TODO: Definir a cor de fundo da caixa usando o valor do array coresOpcoes na posição atual
        // TODO: Adicionar um evento de clique que chamará a função verificarAdivinhacao quando a caixa for clicada
        // TODO: Adicionar a caixa de cor criada como filho do elemento opcoesCores
    }
}

// TODO: Adicionar evento ao botão de novo jogo

// TODO: Executar Função de iniciar o jogo quando a página carregar